const { http, HttpResponse } = require("msw");

const handlers = [
  http.get(
    "https://api.spoonacular.com/recipes/complexSearch",
    ({ request }) => {
      const url = new URL(request.url);
      if (url.searchParams.get("titleMatch") === "eggs") {
        throw new Error("Error calling API");
      }
    }
  ),
];

module.exports = handlers;
