import Signup from "../components/Signup";
import Login from "../components/Login";
import { useState } from "react";

interface landingpageprops {
  authenticateUser: (userId: string) => void;
}

export function LandingPage({ authenticateUser }: landingpageprops) {
  const [showLogin, setShowLogin] = useState(true);
  const handleClick = () => {
    setShowLogin(!showLogin);
  };
  return (
    <div className="bg-[url('/landing-page.jpg')] h-screen w-screen bg-cover flex justify-center items-center">
      <div className="bg-[#fcfcf6] dark:bg-[#526345] h-[75vh] w-[50vw] flex justify-center items-center shadow-2xl min-w-[350px]">
        {!showLogin && (
          <Signup
            handleClick={handleClick}
            authenticateUser={authenticateUser}
          />
        )}
        {showLogin && (
          <Login
            handleClick={handleClick}
            authenticateUser={authenticateUser}
          />
        )}
      </div>
    </div>
  );
}
