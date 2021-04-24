import react, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import { firebaseContext } from "../hooks/FirebaseProvider";
import React from "react";
import firebase from "firebase/app";
import MyImages from "./MyImages";
import Saved from "./Saved";

const Navbar = () => {
  const [error, setError] = useState(null);
  const user = useContext(firebaseContext);
  //   console.log(user);

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <Router>
      <div className="">
        <div className="flex flex-wrap items-center justify-between p-2 bg-blue-200">
          {user && <div>Hey! {user.displayName}</div>}
          <ul className="flex w-full mx-12 items-stretch flex-wrap justify-between">
            <li className="mr-6">
              <Link
                to="/"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Home
              </Link>
            </li>

            {user ? (
              <React.Fragment>
                <Redirect to="/" />

                <li className="mr-6">
                  <Link
                    to="/myImages"
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                  >
                    My Images
                  </Link>
                </li>
                <li className="mr-6">
                  <Link
                    to="/saved"
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                  >
                    Saved Images
                  </Link>
                </li>
                <li className="mr-6">
                  <button
                    className="inline-block text-sm px-4 py-2 leading-none border rounded  border-black hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="mr-6">
                  <Link
                    to="/signin"
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="mr-6">
                  <Link
                    to="/signup"
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                  >
                    Sign Up
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/myImages">
            <MyImages />
          </Route>
          <Route path="/saved">
            <Saved />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Navbar;
