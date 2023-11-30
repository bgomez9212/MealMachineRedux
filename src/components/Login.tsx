import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  handleClick: () => void;
  authenticateUser: () => void;
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
        authenticateUser();
        console.log(user);
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
            <h1 className="text-center text-3xl text-black mb-4">
              Welcome back!
            </h1>
            <form className="w-full">
              <div>
                <input
                  id="email-address"
                  name="email-addres"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 bg-white px-3 text-black"
                />
              </div>

              <div>
                <input
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
                <button onClick={onLogin} className="bg-black w-full mt-2 h-10">
                  Login
                </button>
              </div>
            </form>

            <p className="text-center mt-2 text-black">
              No account yet?{" "}
              <button
                className="text-[#008000] font-bold underline"
                onClick={handleClick}
              >
                Sign up
              </button>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
