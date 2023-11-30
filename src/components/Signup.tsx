import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

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
            <h1 className="text-center text-3xl text-black mb-4">
              Welcome to
              <br />
              Meal Machine!
            </h1>
            <form className="w-full">
              <div>
                <label htmlFor="email-address" />
                <input
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
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="w-full mt-2 h-10 bg-white px-3 text-black"
                />
              </div>

              <button
                type="submit"
                onClick={onSubmit}
                className="bg-black w-full mt-2 h-10"
              >
                Sign up
              </button>
            </form>

            <p className="text-center mt-2 text-black">
              Already have an account? <br />{" "}
              <button
                className="text-[#008000] font-bold underline"
                onClick={handleClick}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
