import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Home } from "./pages/home";
import { MyGroceries } from "./pages/mygroceries";
import { MyIngredients } from "./pages/myingredients";
import { MyRecipes } from "./pages/myrecipes";
import { SavedRecipes } from "./pages/savedRecipes";
import { LandingPage } from "./pages/LandingPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserContext } from "./context/context";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user.uid);
      } else {
        // User is signed out
        setUser(null);
      }

      // Set loading to false once the authentication state is determined
      setLoading(false);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures the effect runs only once

  // Show a loading indicator while checking authentication state
  if (loading) {
    return (
      <div className="bg-[url('landing-page.jpg')] h-screen w-screen bg-cover flex justify-center items-center" />
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
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
              element={<ProtectedRoute element={<Home />} />}
            />
            <Route
              path="groceries"
              element={<ProtectedRoute element={<MyGroceries />} />}
            />
            <Route
              path="ingredients"
              element={<ProtectedRoute element={<MyIngredients />} />}
            />
            <Route
              path="recipes"
              element={<ProtectedRoute element={<MyRecipes />} />}
            />
            <Route
              path="savedRecipes"
              element={<ProtectedRoute element={<SavedRecipes />} />}
            />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
