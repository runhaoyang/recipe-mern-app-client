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
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
  height: 100%;
}

body {
  margin: 0px 100px;
  margin-bottom: 50px;
  padding: 0px;
  font-family: "Nunito", sans-serif;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
}

button {
  font-family: inherit;
  font-size: 1em;
}

`;

const StyledNavBarContainer = styled.div`
  display: flex;
  overflow: hidden;
  background-color: #264653;
  position: sticky;
  top: 0;
  width: 100%;

  .active {
    background-color: #2a9d8f;
  }
`;

const StyledNavBar = styled.div`
  width: 50%;

  & ul li {
    list-style: none;
    width: 25%;
  }
`;

const StyledLeftNavBar = styled(StyledNavBar)`
  & ul li {
    float: left;
  }
`;

const StyledRightNavBar = styled(StyledNavBar)`
  & ul li {
    float: right;
  }
`;

const StyledUl = styled.ul`
  margin: 0px;
  padding: 0px;
  height: 3em;

  & li {
    padding: 0px;
    margin: 0px;
  }

  & li a {
    display: block;
    line-height: 1.5em;
    height: auto;
    line-height: 3em;
    text-align: center;
  }

  .navLinks {
    color: #f2f2f2;
    text-decoration: none;
  }
`;

const App = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userToken, setUserToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [backendUrl] = useState("https://recipe-mern-app-server.onrender.com");

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const token = localStorage.getItem("userToken");
      setUserToken(token);
      setUserInfo(user);
      setIsLoggedIn(true);
    }

    const fetchData = async () => {
      // Initial call to backend to pre-load for faster loading to other components
      try {
        await Axios.get(`${backendUrl}/users`).then((res) => {
          console.log(res);
        });
      } catch (err) {
        console.error(`The error is ${err}`);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <GlobalStyle />
      <div>
        <HashRouter>
          <StyledNavBarContainer>
            <StyledLeftNavBar>
              <StyledUl>
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
                  <NavLink className="navLinks" to="/mycollections">
                    My Collections
                  </NavLink>
                </li>
                <li>
                  <NavLink className="navLinks" to="/addrecipe">
                    Add Recipe
                  </NavLink>
                </li>
              </StyledUl>
            </StyledLeftNavBar>
            <StyledRightNavBar>
              <StyledUl>
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
              </StyledUl>
            </StyledRightNavBar>
          </StyledNavBarContainer>

          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  isLoggedIn={isLoggedIn}
                  userInfo={userInfo}
                  backendUrl={backendUrl}
                />
              }
            />
            <Route
              path="/recipes"
              element={
                <Recipes
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                  isLoggedIn={isLoggedIn}
                  backendUrl={backendUrl}
                />
              }
            />
            <Route
              path="/register"
              element={<Register backendUrl={backendUrl} />}
            />
            <Route
              path="/login"
              element={
                <Login
                  setUserInfo={setUserInfo}
                  setUserToken={setUserToken}
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                  backendUrl={backendUrl}
                />
              }
            />
            <Route
              path="/logout"
              element={<Logout setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/mycollections"
              element={
                <MyCollection
                  setUserInfo={setUserInfo}
                  userInfo={userInfo}
                  userToken={userToken}
                  isLoggedIn={isLoggedIn}
                  backendUrl={backendUrl}
                />
              }
            />
            <Route
              path="/addrecipe"
              element={
                <AddRecipe
                  userInfo={userInfo}
                  isLoggedIn={isLoggedIn}
                  backendUrl={backendUrl}
                />
              }
            ></Route>
          </Routes>
        </HashRouter>
      </div>
    </>
  );
};

export default App;
