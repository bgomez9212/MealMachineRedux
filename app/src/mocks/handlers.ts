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
      extendedIngredients: [
        { id: 1, original: "string" },
        { id: 2, original: "string" },
      ],
      analyzedInstructions: [
        {
          name: "string",
          steps: [
            { number: 1, step: "string" },
            { number: 2, step: "string" },
            { number: 3, step: "string" },
          ],
        },
      ],
    });
  }),
];
