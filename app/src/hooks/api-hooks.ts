import axios from "axios";

export default async function getGroceries(user: string | undefined) {
  return axios
    .get(import.meta.env.VITE_server_groceries, {
      params: {
        user_id: user,
      },
    })
    .then((res) => {
      return res.data;
    });
}
