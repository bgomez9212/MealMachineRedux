import { Navbar } from "./components/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import axios from "axios";
import { Home } from "./pages/home";
import { MyGroceries } from "./pages/mygroceries";
import { MyIngredients } from "./pages/myingredients";
import { useEffect, useState } from "react";
import data from "./randomRecipes.json";
import { LandingPage } from "./pages/landingpage";
export default function App() {
  const [randomRecipes, setRandomRecipes] = useState(data.recipes);
  // useEffect(() => {
  //   axios
  //     .get("https://api.spoonacular.com/recipes/random?number=9", {
  //       headers: {
  //         "x-api-key": `433bf1970e46425f867c84140c43fc99`,
  //       },
  //     })
  //     .then((results) => console.log(results));
  // }, []);
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="home" element={<Home randomRecipes={randomRecipes} />} />
        <Route path="groceries" element={<MyGroceries />} />
        <Route path="ingredients" element={<MyIngredients />} />
      </Routes>
    </BrowserRouter>
  );
}
