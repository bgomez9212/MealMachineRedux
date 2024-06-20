import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(import.meta.env.VITE_server_groceries, () => {
    return HttpResponse.json([
      { id: 1, name: "Tomato", date_added: "2024-01-01" },
    ]);
  }),
  http.post(import.meta.env.VITE_server_groceries, () => {
    return new HttpResponse(null, {
      status: 201,
      statusText: "created",
    });
  }),
  http.delete(import.meta.env.VITE_server_groceries, () => {
    return new HttpResponse(null, {
      status: 201,
      statusText: "deleted",
    });
  }),
  http.get(import.meta.env.VITE_server_ingredients, () => {
    return HttpResponse.json([
      { id: 22, name: "Apples", date_added: "2024-01-01" },
    ]);
  }),
  http.post(import.meta.env.VITE_server_ingredients, () => {
    return new HttpResponse(null, {
      status: 201,
      statusText: "created",
    });
  }),
  http.delete(import.meta.env.VITE_server_ingredients, () => {
    return new HttpResponse(null, {
      status: 201,
      statusText: "deleted",
    });
  }),
  http.get(import.meta.env.VITE_server_recipeDetails, () => {
    return HttpResponse.json({
      id: 1,
      image: "test-source",
      title: "test-recipe",
      readyInMinutes: 30,
      vegetarian: undefined,
      vegan: true,
      glutenFree: false,
      servings: 20,
      sourceUrl: "string",
      ingredientList: [
        { id: 1, ingredientName: "Tomato" },
        { id: 2, ingredientName: "string2" },
        { id: 3, ingredientName: "Apples" },
      ],
      analyzedInstructions: [
        {
          name: "string",
          steps: [
            { number: 1, step: "string1" },
            { number: 2, step: "string2" },
            { number: 3, step: "string3" },
          ],
        },
      ],
    });
  }),
  http.get(import.meta.env.VITE_server_savedRecipes, () => {
    return HttpResponse.json([{ recipe_id: 1, image: "test", title: "test" }]);
  }),
  http.post(import.meta.env.VITE_server_savedRecipes, () => {
    return new HttpResponse(null, { status: 201, statusText: "created" });
  }),
  http.delete(import.meta.env.VITE_server_savedRecipes, () => {
    return new HttpResponse(null, { status: 201, statusText: "deleted" });
  }),
  http.get(import.meta.env.VITE_server_recipes, () => {
    return HttpResponse.json({
      data: [
        {
          id: 1,
          title: "test1",
          image: "test-img",
          missedIngredientCount: 2,
          missedIngredients: [],
        },
        {
          id: 7,
          title: "test7",
          image: "test-img",
          missedIngredientCount: 4,
          missedIngredients: [],
        },
      ],
    });
  }),
  // http.get(import.meta.env.VITE_server_searchRecipes, () => {
  //   console.log("SEARCH RECIPES WAS USED");
  //   return HttpResponse.json([
  //     {
  //       id: 1,
  //       title: "test1",
  //       image: "test-img",
  //       missedIngredientCount: 2,
  //       missedIngredients: [],
  //     },
  //     {
  //       id: 7,
  //       title: "test7",
  //       image: "test-img",
  //       missedIngredientCount: 4,
  //       missedIngredients: [],
  //     },
  //   ]);
  // }),
];
