import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
export function SignupForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  type InputEvent = React.ChangeEvent<HTMLInputElement>;
  type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

  const onSubmit = async (e: ButtonEvent) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="email-address">Email address</label>
          <input
            type="email"
            name="Email address"
            value={email}
            onChange={(e: InputEvent) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e: InputEvent) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <button type="submit" onClick={onSubmit}>
          Sign up
        </button>
      </form>
    </div>
  );
}
