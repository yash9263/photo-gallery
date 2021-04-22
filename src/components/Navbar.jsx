import react, { useContext, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import { firebaseContext } from "../hooks/FirebaseProvider";
import React from "react";
import firebase from 'firebase/app';

const Navbar = () => {
    const [error, setError] = useState(null);
  const user = useContext(firebaseContext);
  console.log(user);

  const handleSignOut = () => {
    firebase.auth().signOut().catch((error) => {
        setError(error.message);
      });
  }
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user ? (
            <React.Fragment>
              <li>My Images</li>
              <li>Saved Images</li>
              <button onClick={handleSignOut}>Sign out</button>
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
        </Switch>
      </nav>
    </Router>
  );
};

export default Navbar;
