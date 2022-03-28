import "./App.css";
import { useState } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Recipes from "./components/Recipes";
import Register from "./components/Register";
import MyCollection from "./components/MyCollection";

const App = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userToken, setUserToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(""); // @todo
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
              {isLoggedIn ? (
                <li>
                  <Link className="navLinks" to="/logout">
                    Logout
                  </Link>
                </li>
              ) : null}

              {!isLoggedIn ? (
                <li>
                  <Link className="navLinks" to="/login">
                    Login
                  </Link>
                </li>
              ) : null}

              <li>
                <Link className="navLinks" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Routes>
          <Route
            exact
            path="/"
            element={<Home isLoggedIn={isLoggedIn} userInfo={userInfo} />}
          />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login
                setUserInfo={setUserInfo}
                setUserToken={setUserToken}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/logout"
            element={<Logout setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/mycollection"
            element={
              <MyCollection
                userInfo={userInfo}
                userToken={userToken}
                isLoggedIn={isLoggedIn}
              />
            }
          />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
