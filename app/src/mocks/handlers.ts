import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(import.meta.env.VITE_server_groceries, () => {
    return HttpResponse.json([
      { id: 1, name: "Tomato", date_added: "2024-01-01" },
    ]);
  }),
  http.delete(import.meta.env.VITE_server_groceries, () => {
    return new HttpResponse(null, {
      status: 201,
      statusText: "deleted",
    });
  }),
  http.post(import.meta.env.VITE_server_groceries, () => {
    return new HttpResponse(null, {
      status: 201,
      statusText: "created",
    });
  }),
  http.post(import.meta.env.VITE_server_ingredients, () => {
    return new HttpResponse(null, {
      status: 201,
      statusText: "created",
    });
  }),
];
