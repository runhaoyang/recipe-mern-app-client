import { useState } from "react";
import { Navigate } from "react-router-dom";
import Axios from "axios";

const Login = ({ setUserInfo, setUserToken, setIsLoggedIn, isLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleOnChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      await Axios.post("http://localhost:5000/auth", {
        username: username,
        password: password,
      }).then((res) => {
        setUsername("");
        setPassword("");
        setErrorMessage("");
        setUserToken(res.data.token);
        localStorage.setItem("userToken", res.data.token);
        getUserInfo(res.data.token);
        setIsLoggedIn(true);
      });
    } catch (err) {
      setSuccessMessage("");
      setErrorMessage("Invalid username or password");
      console.error(`The error is ${err}`);
    }
  };

  const getUserInfo = async (token) => {
    try {
      let data = {
        headers: {
          "x-auth-token": token,
          "content-type": "application/json",
        },
      };
      await Axios.get("http://localhost:5000/auth", data).then((res) => {
        setSuccessMessage(
          "User successfully logged in. User info has been obtained."
        );
        setErrorMessage("");
        setUserInfo(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        console.log(res.data);
      });
    } catch (err) {
      setSuccessMessage("");
      setErrorMessage("Error obtaining user info");
      console.error(`The error is ${err}`);
    }
  };

  return (
    <>
      {isLoggedIn === true ? (
        <Navigate to="/" />
      ) : (
        <div className="loginContent">
          <form action="#" onSubmit={handleOnSubmitLogin}>
            <div>
              Username:{" "}
              <input
                type="text"
                placeholder=""
                value={username}
                onChange={handleOnChangeUsername}
              />
            </div>
            <div>
              Password:{" "}
              <input
                type="text"
                value={password}
                onChange={handleOnChangePassword}
              />
            </div>
            <button>Log in </button>
          </form>
          <div className="messages">
            <div>{successMessage}</div>
            <div>{errorMessage}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
