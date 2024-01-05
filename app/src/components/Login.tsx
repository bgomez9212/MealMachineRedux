import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface LoginProps {
  handleClick: () => void;
  authenticateUser: (userId: string) => void;
}

const Login = ({ handleClick, authenticateUser }: LoginProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
        authenticateUser(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
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
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 bg-white px-3 text-black"
                />
              </div>

              <div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 h-10 bg-white px-3 text-black"
                />
              </div>

              <div>
                <Button
                  onClick={onLogin}
                  className="bg-black w-full mt-2 h-10 text-slate-50"
                >
                  {" "}
                  LOGIN
                </Button>
              </div>
            </form>

            <p className="text-center mt-2 text-black">
              No account yet?
              <br />
              <Button variant={"link"} onClick={handleClick}>
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
