import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface SignupProps {
  handleClick: () => void;
  authenticateUser: (userId: string) => void;
}

const Signup = ({ handleClick, authenticateUser }: SignupProps) => {
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [visible, setVisible] = useState(false);

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
            <div className="h-[180px] w-[300px] bg-[url('/logo-landing.png')] bg-cover dark:bg-[url('/logo-landing-dark.PNG')]"></div>
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

              <div className="flex items-center relative">
                <Input
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  // Other input props...
                  className="w-full mt-2 h-10 bg-white px-3 text-black"
                  onChange={(e) =>
                    setSignUpInfo({ ...signUpInfo, password: e.target.value })
                  }
                />
                <div
                  className="absolute right-3 cursor-pointer mt-1"
                  onClick={() => setVisible((prevVisible) => !prevVisible)}
                >
                  {visible ? (
                    <VisibilityOffIcon sx={{ color: "black" }} />
                  ) : (
                    <VisibilityIcon sx={{ color: "black" }} />
                  )}
                </div>
              </div>

              <div className="flex items-center relative">
                <Input
                  type={visible ? "text" : "password"}
                  placeholder="Confirm Password"
                  // Other input props...
                  className="w-full mt-2 h-10 bg-white px-3 text-black"
                  onChange={(e) =>
                    setSignUpInfo({
                      ...signUpInfo,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <div
                  className="absolute right-3 cursor-pointer mt-1"
                  onClick={() => setVisible((prevVisible) => !prevVisible)}
                >
                  {visible ? (
                    <VisibilityOffIcon sx={{ color: "black" }} />
                  ) : (
                    <VisibilityIcon sx={{ color: "black" }} />
                  )}
                </div>
              </div>

              <Button
                disabled={signUpInfo.password !== signUpInfo.confirmPassword}
                type="submit"
                onClick={onSubmit}
                className="bg-black w-full mt-2 h-10 text-slate-50 dark:hover:text-slate-950"
              >
                SIGN UP
              </Button>
              {signUpInfo.password !== signUpInfo.confirmPassword && (
                <p className="text-center text-red-400 text-xs">
                  Passwords do not match
                </p>
              )}
            </form>

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
