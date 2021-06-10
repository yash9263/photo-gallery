import react from "react";
import { Router, Switch, Route } from "react-router";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MyImages from "./components/MyImages";
import Saved from "./components/Saved";
import LoginSnack from "./components/LoginSnack";
import Navbar from "./components/Navbar";
import FirebaseProvider from "./hooks/FirebaseProvider";
import "./styles.scss";

export default function App() {
  return (
    <FirebaseProvider>
      <div className="App">
        <Navbar />
      </div>
    </FirebaseProvider>
  );
}
