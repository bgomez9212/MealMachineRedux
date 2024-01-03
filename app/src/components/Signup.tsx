import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useTheme } from "@/context/themeContext";

interface SignupProps {
  handleClick: () => void;
  authenticateUser: (userId: string) => void;
}

const Signup = ({ handleClick, authenticateUser }: SignupProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(
      auth,
      signUpInfo.email,
      signUpInfo.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        signInWithEmailAndPassword(auth, signUpInfo.email, signUpInfo.password);
        // ...
        authenticateUser(user.uid);
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <main>
      <section>
        <div>
          <div className="flex flex-col justify-center items-center w-[300px]">
            {theme === "dark" ? (
              <img src="/logo-landing-dark.PNG" />
            ) : (
              <img src="/logo-landing.png" />
            )}
            <form className="w-full mt-5">
              <div>
                <label htmlFor="email-address" />
                <Input
                  type="email"
                  name="email-address"
                  value={signUpInfo.email}
                  onChange={(e) =>
                    setSignUpInfo((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  required
                  placeholder="Email address"
                  className="w-full h-10 bg-white px-3 text-black"
                />
              </div>

              <div>
                <label htmlFor="password" />
                <Input
                  type="password"
                  name="password"
                  value={signUpInfo.password}
                  onChange={(e) =>
                    setSignUpInfo((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                  placeholder="Password"
                  className="w-full mt-2 h-10 bg-white px-3 text-black"
                />
              </div>

              <div>
                <label htmlFor="confirm-password" />
                <Input
                  type="password"
                  name="confirm-password"
                  value={signUpInfo.confirmPassword}
                  onChange={(e) =>
                    setSignUpInfo((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  required
                  placeholder="Confirm Password"
                  className="w-full mt-2 h-10 bg-white px-3 text-black"
                />
              </div>

              <Button
                disabled={signUpInfo.password !== signUpInfo.confirmPassword}
                type="submit"
                onClick={onSubmit}
                className="bg-black w-full mt-2 h-10 text-slate-50"
              >
                SIGN UP
              </Button>
            </form>

            {signUpInfo.password !== signUpInfo.confirmPassword && (
              <p className="text-center text-red-600 text-xs">
                Passwords do not match
              </p>
            )}

            <p className="text-center mt-2 text-black">
              Already have an account? <br />{" "}
              <Button
                className="text-[#8FAC5F]"
                variant={"link"}
                onClick={handleClick}
              >
                Sign in
              </Button>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
