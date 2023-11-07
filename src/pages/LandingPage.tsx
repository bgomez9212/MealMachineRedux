import Signup from "../components/Signup";
import Login from "../components/Login";
import { useState } from "react";

export function LandingPage() {
  const [hasAccount, setHasAccount] = useState(false);
  const handleClick = () => {
    setHasAccount(!hasAccount);
  };
  return (
    <div className="bg-[url('landing-page.jpg')] h-screen w-screen bg-cover flex justify-center items-center">
      <div className="bg-[#D9D9D9] h-[75vh] w-[50vw] flex justify-center items-center border-black border">
        {!hasAccount && <Signup handleClick={handleClick} />}
        {hasAccount && <Login handleClick={handleClick} />}
      </div>
    </div>
  );
}
