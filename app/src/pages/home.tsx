import { RecipeCard } from "@/components/RecipeCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { type HomeRecipes } from "@/types";
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
import { Button } from "@mui/material";

export function Home() {
  const { toast } = useToast();
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  // const {
  //   data: recipes,
  //   isFetching: isLoadingRecipes,
  //   error,
  // } = useQuery<HomeRecipes[]>({
  //   queryKey: ["recipes"],
  //   queryFn: () => getRecipes(user),
  //   refetchOnWindowFocus: false,
  // });

  const {
    data,
    error,
    fetchNextPage,
    isFetching: isLoadingRecipes,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["recipes"],
    queryFn: ({ pageParam = 0 }) =>
      getRecipes({ user: user, pageParam: pageParam }),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
  });

  console.log(data);

  // const { data: savedRecipes } = useQuery({
  //   queryKey: ["savedRecipes"],
  //   queryFn: () => getSavedRecipesIds(user),
  //   refetchOnWindowFocus: false,
  // });

  // const { data: searchResults, isFetching: isSearchLoading } = useQuery<
  //   HomeRecipes[]
  // >({
  //   queryKey: ["searchResults", debouncedSearch],
  //   queryFn: () => getSearchResults({ user, debouncedSearch }),
  //   refetchOnWindowFocus: false,
  //   enabled: debouncedSearch.length >= 3,
  // });

  // const { mutateAsync: saveRecipeMutation } = useMutation({
  //   mutationFn: saveRecipe,
  //   onSuccess: (_, variables) => {
  //     queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
  //     toast({
  //       title: "Recipe Saved!",
  //       description: `${variables.title} added to your saved recipes!`,
  //     });
  //   },
  // });

  // function handleReadRecipe(recipe_id: number) {
  //   navigate(`/details/${recipe_id}`);
  // }

  // const { mutateAsync: removeSavedRecipeMutation } = useMutation({
  //   mutationFn: removeSavedRecipe,
  //   onSuccess: (_, variables) => {
  //     queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
  //     toast({
  //       title: "Recipe Removed",
  //       description: `${variables.title} removed from your saved recipes!`,
  //     });
  //   },
  // });

  if (isLoadingRecipes) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <ClipLoader color="#8FAC5F" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        There seems to be an error. Try again later.
      </div>
    );
  }

  return (
    <div data-testid="home-component">
      <Button onClick={() => fetchNextPage()}>Click Me</Button>
      {/* <div className="mt-5 flex justify-center">
        <Input
          data-testid="recipe-search"
          className="w-[90%]"
          placeholder="Search For Recipes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {isSearchLoading ? (
        <div
          data-testid="search-loading"
          className="w-full flex items-center justify-center mt-20"
        >
          <ClipLoader color="#8FAC5F" />
        </div>
      ) : search.length >= 3 ? (
        <div
          data-testid="search-recipe-results"
          className="min-[630px]:grid min-[630px]:grid-cols-2 lg:grid-cols-3 px-10 gap-x-10 mb-20"
        >
          {searchResults?.map(({ title, id, image, missedIngredients }) => (
            <RecipeCard
              key={title}
              title={title}
              image={image}
              handleSaveClick={() =>
                saveRecipeMutation({ user, id, image, title })
              }
              handleReadRecipe={() => handleReadRecipe(id)}
              handleDeleteSavedRecipe={() =>
                removeSavedRecipeMutation({ user, id, title })
              }
              isSaved={savedRecipes?.includes(id)}
              missedIngredientCount={missedIngredients.length}
              missedIngredients={missedIngredients}
            />
          ))}
        </div>
      ) : (
        <div>
          {recipes?.length ? (
            <div className="min-[630px]:grid min-[630px]:grid-cols-2 lg:grid-cols-3 px-10 gap-x-10 mb-20">
              {recipes?.map(
                ({
                  title,
                  image,
                  id,
                  missedIngredientCount,
                  missedIngredients,
                }) => (
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
      )} */}
    </div>
  );
}
