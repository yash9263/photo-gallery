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
import "./Navbar.css";

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
      <nav>
        {user && <div>Hey! {user.displayName}</div>}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          {user ? (
            <React.Fragment>
              <Redirect to="/" />

              <li>
                <Link to="/myImages">My Images</Link>
              </li>
              <li>
                <Link to="/saved">Saved Images</Link>
              </li>
              <li>
                <button onClick={handleSignOut}>Sign out</button>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </React.Fragment>
          )}
        </ul>

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
      </nav>
    </Router>
  );
};

export default Navbar;
