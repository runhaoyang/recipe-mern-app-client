import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { HashRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Recipes from "./components/Recipes";
import Register from "./components/Register";
import MyCollection from "./components/MyCollection";
import AddRecipe from "./components/AddRecipe";

const App = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userToken, setUserToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const token = localStorage.getItem("userToken");
      setUserToken(token);
      setUserInfo(user);
      setIsLoggedIn(true);
    }

    const fetchData = async () => {
      // Initial call to backend to pre-load for faster loading to other components since the server is hosted on heroku which puts the app to sleep after 30minutes of inactivity
      try {
        await Axios.get(
          "https://recipe-mern-app-server.herokuapp.com/users"
        ).then((res) => {
          console.log(res);
        });
      } catch (err) {
        console.error(`The error is ${err}`);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <HashRouter>
        <div className="navbarContainer">
          <div className="navBar1">
            <ul className="navbar-ul">
              <li>
                <NavLink to="/" className="navLinks">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="navLinks" to="/recipes">
                  Recipes
                </NavLink>
              </li>
              <li>
                <NavLink className="navLinks" to="/mycollection">
                  My Collections
                </NavLink>
              </li>
              <li>
                <NavLink className="navLinks" to="/addRecipe">
                  Add Recipe
                </NavLink>
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
                  <NavLink className="navLinks" to="/login">
                    Login
                  </NavLink>
                </li>
              ) : null}

              <li>
                <NavLink className="navLinks" to="/register">
                  Register
                </NavLink>
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
          <Route
            path="/recipes"
            element={
              <Recipes
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                isLoggedIn={isLoggedIn}
              />
            }
          />
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
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                userToken={userToken}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/addRecipe"
            element={<AddRecipe userInfo={userInfo} isLoggedIn={isLoggedIn} />}
          ></Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
