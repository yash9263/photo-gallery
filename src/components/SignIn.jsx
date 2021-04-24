import react, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  function changeHadler(event) {
    const value = event.target.value;
    const type = event.currentTarget.name;
    if (type == "email") {
      setEmail(event.target.value);
    } else if (type == "password") {
      setPassword(event.target.value);
    }
  }

  const SignInWithEmail = (event) => {
    event.preventDefault();
    if (email && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  return (
    <div className="w-full max-w-xs my-4 mx-auto">
      <form
        action=""
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            onChange={changeHadler}
            id="email"
            placeholder="abc@email.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            onChange={changeHadler}
            id="password"
            placeholder="password"
            required
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div class="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={SignInWithEmail}
          >
            Sign In
          </button>
        </div>
      </form>
      {/* <button>Sign in using google</button> */}
    </div>
  );
};

export default SignIn;
