import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

interface LoginProps {
  handleClick: () => void;
}

const Login = ({ handleClick }: LoginProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");

  const onLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => {
        navigate("/home");
      })
      .catch(() => {
        setErrorMessage("Incorrect email or password");
      });
  };

  return (
    <>
      <main data-testid="login-component">
        <Modal
          className="flex justify-center items-center"
          open={modal}
          onClose={() => setModal(false)}
        >
          <Box
            className={
              "bg-white dark:bg-black shadow-lg border border-white p-10 flex flex-col items-center justify-center w-[90vw] sm:w-1/2"
            }
          >
            <Input
              name="email-address"
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 bg-white px-3 text-black mb-3"
            />
            <Button>Send Email</Button>
          </Box>
        </Modal>
        <section>
          <div className="flex flex-col justify-center items-center w-[300px]">
            <div className="h-[180px] w-[300px] bg-[url('/logo-landing.png')] bg-cover dark:bg-[url('/logo-landing-dark.PNG')]" />
            <form className="w-full mt-5">
              <div>
                <Input
                  data-testid="email-input"
                  id="email-address"
                  name="email-address"
                  type="email"
                  required
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full h-10 bg-white px-3 text-black"
                />
              </div>

              <div className="flex items-center relative">
                <Input
                  data-testid="password-input"
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  className="w-full mt-2 h-10 bg-white px-3 text-black"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <div
                  data-testid="visibility-button"
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
                  data-testid="login-button"
                  onClick={onLogin}
                  className="bg-black w-full mt-2 h-10 text-slate-50 dark:hover:text-slate-950"
                >
                  {" "}
                  LOGIN
                </Button>
                {errorMessage && (
                  <p
                    data-testid="login-error"
                    className={`text-center text-red-400 dark:text-red-500`}
                  >
                    {errorMessage}
                  </p>
                )}
              </div>
            </form>

            <div className="flex flex-col mt-2">
              <Button
                data-testid="forgot-button"
                className="text-lightGreen h-5"
                variant={"link"}
                onClick={() => setModal(true)}
              >
                Forgot Password?
              </Button>
              <p className="text-center mt-2 text-black">No account yet?</p>
              <Button
                data-testid="sign-up-button"
                className="text-lightGreen h-5"
                variant={"link"}
                onClick={handleClick}
              >
                Sign up
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
