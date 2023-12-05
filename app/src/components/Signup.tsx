import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SignupProps {
  handleClick: () => void;
  authenticateUser: () => void;
}

const Signup = ({ handleClick, authenticateUser }: SignupProps) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // console.log(user);
        // navigate("/");
        signInWithEmailAndPassword(auth, email, password);
        // ...
        authenticateUser();
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
            <img src="/public/logo-landing.png" />
            <form className="w-full">
              <div>
                <label htmlFor="email-address" />
                <Input
                  type="email"
                  name="email-address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="w-full mt-2 h-10 bg-white px-3 text-black"
                />
              </div>

              <Button
                type="submit"
                onClick={onSubmit}
                className="bg-black w-full mt-2 h-10 text-slate-50"
              >
                SIGN UP
              </Button>
            </form>

            <p className="text-center mt-2 text-black">
              Already have an account? <br />{" "}
              <Button variant={"link"} onClick={handleClick}>
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
