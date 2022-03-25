import "./App.css";
import { useState } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Recipes from "./components/Recipes";
import Register from "./components/Register";
import MyCollection from "./components/MyCollection";

const App = () => {
  const [userInfo, setUserInfo] = useState({});
  return (
    <div className="App">
      <HashRouter>
        <div className="navbarContainer">
          <div className="navBar1">
            <ul className="navbar-ul">
              <li>
                <Link className="navLinks" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="navLinks" to="/recipes">
                  Recipes
                </Link>
              </li>
              <li>
                <Link className="navLinks" to="/mycollection">
                  My Collections
                </Link>
              </li>
            </ul>
          </div>
          <div className="navBar2">
            <ul className="navbar-ul">
              <li>
                <Link className="navLinks" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="navLinks" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setUserInfo={setUserInfo} userInfo={userInfo} />}
          />
          <Route
            path="/mycollection"
            element={<MyCollection userInfo={userInfo} />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
