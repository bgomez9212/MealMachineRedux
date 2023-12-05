import Signup from "../components/Signup";
import Login from "../components/Login";
import { useState } from "react";

interface LandingPageProps {
  authenticateUser: () => void;
}

export function LandingPage({ authenticateUser }: LandingPageProps) {
  const [hasAccount, setHasAccount] = useState(false);
  const handleClick = () => {
    setHasAccount(!hasAccount);
  };
  return (
    <div className="bg-[url('landing-page.jpg')] h-screen w-screen bg-cover flex justify-center items-center">
      <div className="bg-[#fcfcf6] h-[75vh] w-[50vw] flex justify-center items-center shadow-2xl">
        {!hasAccount && (
          <Signup
            handleClick={handleClick}
            authenticateUser={authenticateUser}
          />
        )}
        {hasAccount && (
          <Login
            handleClick={handleClick}
            authenticateUser={authenticateUser}
          />
        )}
      </div>
    </div>
  );
}
