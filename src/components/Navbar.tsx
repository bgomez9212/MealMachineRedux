import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="w-[100vw] h-20 border flex items-center">
      <Link to="/home">MealMachine</Link>
      <Link to="/ingredients">Ingredients</Link>
      <Link to="/groceries">Groceries</Link>
    </div>
  );
}
