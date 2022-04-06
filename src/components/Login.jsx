import { useState } from "react";
import { Navigate } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = ({ setUserInfo, setUserToken, setIsLoggedIn, isLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        setUserToken(res.data.token);
        localStorage.setItem("userToken", res.data.token);
        getUserInfo(res.data.token);
        setIsLoggedIn(true);
      });
    } catch (err) {
      errorLoggingIn();
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
        setUserInfo(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      });
    } catch (err) {
      console.error(`The error is ${err}`);
    }
  };

  const errorLoggingIn = () => {
    toast.error("Invalid username or password.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <>
      {isLoggedIn === true ? (
        <Navigate to="/" />
      ) : (
        <div className="loginContent">
          <form action="#" onSubmit={handleOnSubmitLogin}>
            <div className="usernameField">
              Username:{" "}
              <input
                type="text"
                placeholder=""
                value={username}
                onChange={handleOnChangeUsername}
              />
            </div>
            <div className="passwordField">
              Password:{" "}
              <input
                type="text"
                value={password}
                onChange={handleOnChangePassword}
              />
            </div>
            <div className="submitField">
              <button>Log in </button>
            </div>
          </form>
          <ToastContainer limit={5} />
        </div>
      )}
    </>
  );
};

export default Login;
