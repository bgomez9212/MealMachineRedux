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

export function Navbar() {
  const location = useLocation();

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
      </NavigationMenuList>
    </NavigationMenu>
  ) : null;
}
