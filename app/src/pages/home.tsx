import { RecipeCard } from "@/components/RecipeCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { CombinedObject, Occurrences, type HomeRecipes } from "@/types";
import ClipLoader from "react-spinners/ClipLoader";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/context";
import {
  getRecipes,
  getSavedRecipesIds,
  getSearchResults,
  removeSavedRecipe,
  saveRecipe,
} from "@/hooks/recipes";
import { useDebounce } from "use-debounce";
import React from "react";
import { useInView } from "react-intersection-observer";

export function Home() {
  const { toast } = useToast();
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const { ref: recipeRef, inView: recipeInView } = useInView();
  const { ref: searchRef, inView: searchInView } = useInView();

  function removeDuplicates(pagesArr: { data: [] }[]) {
    const combined = pagesArr.flatMap<CombinedObject>((obj) => obj.data);
    const occurrences = combined.reduce<Occurrences>((acc, obj) => {
      acc[obj.id] = (acc[obj.id] || 0) + 1;
      return acc;
    }, {});
    const result = combined.filter((obj) => occurrences[obj.id] === 1);
    return result;
  }

  const {
    data: recipes,
    error: errorRecipe,
    fetchNextPage: fetchRecipes,
    isLoading: isLoadingRecipes,
    isFetchingNextPage: isFetchingNextRecipes,
  } = useInfiniteQuery({
    queryKey: ["recipes"],
    queryFn: ({ pageParam = 1 }) => getRecipes({ user, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      data.pages[data.pages.length - 1].data = removeDuplicates(data.pages);
    },
  });

  const {
    data: searchResults,
    error: errorSearchResults,
    fetchNextPage: fetchSearchResults,
    isLoading: isLoadingSearchResults,
    isFetchingNextPage: isFetchingNextSearchResults,
  } = useInfiniteQuery({
    queryKey: ["searchResults", debouncedSearch],
    queryFn: ({ pageParam = 1 }) =>
      getSearchResults({ user, debouncedSearch, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      data.pages[data.pages.length - 1].data = removeDuplicates(data.pages);
    },
    enabled: debouncedSearch.length >= 3,
  });

  useEffect(() => {
    if (recipeInView) {
      fetchRecipes();
    }
    if (searchInView) {
      fetchSearchResults();
    }
  }, [fetchRecipes, recipeInView, fetchSearchResults, searchInView]);

  const { data: savedRecipes } = useQuery({
    queryKey: ["savedRecipes"],
    queryFn: () => getSavedRecipesIds(user),
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: saveRecipeMutation } = useMutation({
    mutationFn: saveRecipe,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
      toast({
        title: "Recipe Saved!",
        description: `${variables.title} added to your saved recipes!`,
      });
    },
  });

  function handleReadRecipe(recipe_id: number) {
    navigate(`/details/${recipe_id}`);
  }

  const { mutateAsync: removeSavedRecipeMutation } = useMutation({
    mutationFn: removeSavedRecipe,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
      toast({
        title: "Recipe Removed",
        description: `${variables.title} removed from your saved recipes!`,
      });
    },
  });

  if (isLoadingRecipes) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <ClipLoader color="#8FAC5F" />
      </div>
    );
  }

  if (errorRecipe) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        There seems to be an error. Try again later.
      </div>
    );
  }

  if (errorSearchResults) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        There seems to be an error. Try again later.
      </div>
    );
  }

  return (
    <div data-testid="home-component">
      <div className="mt-5 flex justify-center">
        <Input
          data-testid="recipe-search"
          className="w-[90%]"
          placeholder="Search For Recipes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {isLoadingSearchResults ? (
        <div
          data-testid="search-loading"
          className="w-full flex items-center justify-center mt-20"
        >
          <ClipLoader color="#8FAC5F" />
        </div>
      ) : searchResults?.pages[0].data.length ? (
        <div
          data-testid="search-recipe-results"
          className="min-[630px]:grid min-[630px]:grid-cols-2 lg:grid-cols-3 px-10 gap-x-10 mb-20"
        >
          {searchResults?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map(
                ({ title, image, id, missedIngredients }: HomeRecipes) => (
                  <RecipeCard
                    key={title}
                    title={title}
                    image={image}
                    handleSaveClick={() =>
                      saveRecipeMutation({ user, id, title, image })
                    }
                    handleReadRecipe={() => handleReadRecipe(id)}
                    handleDeleteSavedRecipe={() =>
                      removeSavedRecipeMutation({ user, id, title })
                    }
                    isSaved={savedRecipes?.includes(id)}
                    missedIngredientCount={missedIngredients.length}
                    missedIngredients={missedIngredients}
                  />
                )
              )}
            </React.Fragment>
          ))}
          <div ref={searchRef} />
          {isFetchingNextSearchResults && (
            <div className="w-full flex items-center justify-center mt-20">
              <ClipLoader color="#8FAC5F" />
            </div>
          )}
        </div>
      ) : (
        <div>
          {recipes?.pages[0].data.length ? (
            <div className="min-[630px]:grid min-[630px]:grid-cols-2 lg:grid-cols-3 px-10 gap-x-10 mb-20">
              {recipes?.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group.data.map(
                    ({
                      title,
                      image,
                      id,
                      missedIngredientCount,
                      missedIngredients,
                    }: HomeRecipes) => (
                      <RecipeCard
                        key={title}
                        title={title}
                        image={image}
                        handleSaveClick={() =>
                          saveRecipeMutation({ user, id, title, image })
                        }
                        handleReadRecipe={() => handleReadRecipe(id)}
                        handleDeleteSavedRecipe={() =>
                          removeSavedRecipeMutation({ user, id, title })
                        }
                        isSaved={savedRecipes?.includes(id)}
                        missedIngredientCount={missedIngredientCount}
                        missedIngredients={missedIngredients}
                      />
                    )
                  )}
                </React.Fragment>
              ))}
              <div ref={recipeRef} />
              {isFetchingNextRecipes && (
                <div className="w-full flex items-center justify-center mt-20">
                  <ClipLoader color="#8FAC5F" />
                </div>
              )}
            </div>
          ) : (
            <div data-testid="no-ingredients-msg" className="text-center mt-10">
              <h1 className="underline text-xl mb-2">How To Get Started</h1>
              <p className="px-14">
                To get your recommended recipes, add some ingredients to your
                kitchen. Navigate to the Ingredients page and add whatever you
                have available to cook with. After submitting your ingredients,
                come back to this page by clicking either Home or Recipes, and
                you will have a list of recipes that are either ready to cook,
                or missing a minimal amount of ingredients.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
