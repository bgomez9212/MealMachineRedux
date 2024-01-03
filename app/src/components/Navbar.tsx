import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { getAuth, signOut } from "firebase/auth";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/context/themeContext";
export function Navbar() {
  const location = useLocation();
  const { setTheme } = useTheme();

  const pathsWithoutNavbar = ["/"];

  const showNavbar = !pathsWithoutNavbar.includes(location.pathname);

  const handleSignOutClick = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log("unsuccessful", error);
      });
  };

  const navigate = useNavigate();

  function handleClick() {
    navigate("/savedRecipes");
  }

  return showNavbar ? (
    <NavigationMenu className="border-b px-10 py-5">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="home">
              <img src="/logo-nav-bar.png" className="h-11" />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={`text-[#526345] ${
              location.pathname === "/myrecipes"
                ? "text-[#8FAC5F]"
                : "hover:text-[#8FAC5F]"
            }`}
          >
            <Link to="myrecipes">Recipes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={`text-[#526345] ${
              location.pathname === "/ingredients"
                ? "text-[#8FAC5F]"
                : "hover:text-[#8FAC5F]"
            }`}
          >
            <Link to="ingredients">Ingredients</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={`text-[#526345] ${
              location.pathname === "/groceries"
                ? "text-[#8FAC5F]"
                : "hover:text-[#8FAC5F]"
            }`}
          >
            <Link to="groceries">Groceries</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-[#526345] hover:text-[#8FAC5F]">
              Profile
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleClick}>
                Saved Recipes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOutClick}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </NavigationMenuList>
    </NavigationMenu>
  ) : null;
}
