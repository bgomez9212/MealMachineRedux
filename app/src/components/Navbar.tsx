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
import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "@/context/themeContext";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import KitchenIcon from "@mui/icons-material/Kitchen";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { useState } from "react";
import { Paper } from "@mui/material";

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
  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  function handleClick() {
    navigate("/savedRecipes");
  }

  return showNavbar ? (
    <>
      <NavigationMenu
        data-testid="navigation-bar"
        className="border-b px-10 py-5 sticky top-0"
      >
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="home">
                <div className="h-[44px] w-[199px] bg-[url('/logo-nav-bar.png')] bg-cover dark:bg-[url('/logo-nav-bar-dark.PNG')]"></div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={`hidden md:block ${
                location.pathname === "/home"
                  ? "text-lightGreen dark:text-lightGreen"
                  : "hover:text-lightGreen dark:hover:text-lightGreen"
              }`}
            >
              <Link data-testid="home-link" to="home">
                Recipes
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={`hidden md:block ${
                location.pathname === "/ingredients"
                  ? "text-lightGreen dark:text-lightGreen"
                  : "hover:text-lightGreen dark:hover:text-lightGreen"
              }`}
            >
              <Link data-testid="ingredients-link" to="ingredients">
                Ingredients
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={`hidden md:block ${
                location.pathname === "/groceries"
                  ? "text-lightGreen dark:text-lightGreen"
                  : "hover:text-lightGreen dark:hover:text-lightGreen"
              }`}
            >
              <Link data-testid="groceries-link" to="groceries">
                Groceries
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                data-testid="dropdown-menu"
                className="hidden md:block dark:text-[#fcfcf6] hover:text-lightGreen dark:hover:text-lightGreen"
              >
                Profile
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  data-testid="saved-recipes-item"
                  onClick={handleClick}
                >
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
              <Button variant="outline" size="icon" className="rounded-full">
                <Sun className="hidden md:block md:h-[1.2rem] md:w-[1.2rem] md:rotate-0 md:scale-100 md:transition-all md:dark:-rotate-90 md:dark:scale-0" />
                <Moon className="hidden md:block md:absolute md:h-[1.2rem] md:w-[1.2rem] md:rotate-90 md:scale-0 md:transition-all md:dark:rotate-0 md:dark:scale-100" />
                <User className="md:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[100vw] md:w-full">
              <DropdownMenuItem
                className="h-20 md:h-8 border-b"
                onClick={() => setTheme("light")}
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                className="h-20 md:h-8 border-b"
                onClick={() => setTheme("dark")}
              >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hidden md:flex h-20 md:h-8"
                onClick={() => setTheme("system")}
              >
                System
              </DropdownMenuItem>
              <DropdownMenuItem
                className="md:hidden h-20"
                onClick={handleSignOutClick}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuList>
      </NavigationMenu>
      <Paper
        className="md:hidden"
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Box>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Home"
              icon={<HomeIcon />}
              onClick={() => navigate("/home")}
            />
            <BottomNavigationAction
              label="Ingredients"
              icon={<KitchenIcon />}
              onClick={() => navigate("/ingredients")}
            />
            <BottomNavigationAction
              label="Groceries"
              icon={<ChecklistIcon />}
              onClick={() => navigate("/groceries")}
            />
            <BottomNavigationAction
              label="Cookbook"
              icon={<DinnerDiningIcon />}
              onClick={() => navigate("/savedRecipes")}
            />
          </BottomNavigation>
        </Box>
      </Paper>
    </>
  ) : null;
}
