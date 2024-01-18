import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface LoginProps {
  handleClick: () => void;
  authenticateUser: (userId: string) => void;
}

const Login = ({ handleClick, authenticateUser }: LoginProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const onLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
        authenticateUser(user.uid);
      })
      .catch(() => {
        setErrorMessage("Incorrect email or password");
      });
  };

  return (
    <>
      <main>
        <section>
          <div className="flex flex-col justify-center items-center w-[300px]">
            <div className="h-[180px] w-[300px] bg-[url('/logo-landing.png')] bg-cover dark:bg-[url('/logo-landing-dark.PNG')]"></div>
            <form className="w-full mt-5">
              <div>
                <Input
                  id="email-address"
                  name="email-address"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                    setFormData({ ...formData, password: e.target.value })
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

              <div>
                <Button
                  onClick={onLogin}
                  className="bg-black w-full mt-2 h-10 text-slate-50 dark:hover:text-slate-950"
                >
                  {" "}
                  LOGIN
                </Button>
                {errorMessage && (
                  <p className="text-center text-red-400 dark:text-red-500">
                    {errorMessage}
                  </p>
                )}
              </div>
            </form>

            <p className="text-center mt-2 text-black">
              No account yet?
              <br />
              <Button
                className="text-[#8FAC5F]"
                variant={"link"}
                onClick={handleClick}
              >
                Sign up
              </Button>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
