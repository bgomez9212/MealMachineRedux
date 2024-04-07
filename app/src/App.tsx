import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Home } from "./pages/home";
import { MyGroceries } from "./pages/Groceries";
import { MyIngredients } from "./pages/Ingredients";
import { SavedRecipes } from "./pages/savedRecipes";
import { LandingPage } from "./pages/LandingPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserContext } from "./context/context";
import { ThemeProvider } from "./context/themeContext";
import { useQuery } from "react-query";
import { RecipeDetailPage } from "./pages/RecipeDetailsPage";
import axios from "axios";
import { type Groceries } from "./types";
import ClipLoader from "react-spinners/ClipLoader";

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  });

  const { data: groceries } = useQuery<Groceries[]>({
    queryKey: ["groceries"],
    queryFn: async () =>
      axios
        .get(import.meta.env.VITE_server_groceries, {
          params: {
            user_id: user,
          },
        })
        .then((res) => {
          return res.data;
        }),
    enabled: !!user,
  });
  if (loading) {
    return (
      <div>
        <ClipLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to="/home" />
                ) : (
                  <LandingPage authenticateUser={(userId) => setUser(userId)} />
                )
              }
            />
            <Route
              path="home"
              element={
                <ProtectedRoute
                  element={<Home groceries={groceries || []} />}
                />
              }
            />
            <Route
              path="groceries"
              element={
                <ProtectedRoute
                  element={<MyGroceries groceries={groceries || []} />}
                />
              }
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
      </UserContext.Provider>
    </ThemeProvider>
  );
}
