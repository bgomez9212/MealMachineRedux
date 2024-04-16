import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/home";
import { MyGroceries } from "./pages/Groceries";
import { MyIngredients } from "./pages/Ingredients";
import { SavedRecipes } from "./pages/savedRecipes";
import { LandingPage } from "./pages/LandingPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RecipeDetailPage } from "./pages/RecipeDetailsPage";
import ClipLoader from "react-spinners/ClipLoader";
import { useUserContext } from "./context/context";

export default function App() {
  const { user, loading } = useUserContext();
  if (loading) {
    return (
      <div
        data-testid="app-loader"
        className="flex justify-center items-center w-screen h-screen"
      >
        <ClipLoader color="#8FAC5F" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <LandingPage />}
        />
        <Route path="home" element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="groceries"
          element={<ProtectedRoute element={<MyGroceries />} />}
        />
        <Route
          path="ingredients"
          element={<ProtectedRoute element={<MyIngredients />} />}
        />
        <Route
          path="savedRecipes"
          element={<ProtectedRoute element={<SavedRecipes />} />}
        />
        <Route
          path="details/:recipe_id"
          element={<ProtectedRoute element={<RecipeDetailPage />} />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
