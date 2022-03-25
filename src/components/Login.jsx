import { useState } from "react";
import Axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userToken, setUserToken] = useState("");
  const [userInfo, setUserInfo] = useState([]);

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
        getUserInfo(res.data.token);
      });
    } catch (err) {
      setSuccessMessage("");
      setErrorMessage("Invalid username or password");
      console.error(`The error is ${err}`);
    }
  };

  const getUserInfo = async (token) => {
    console.log("inside the getUserInfo function");
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
        console.log(res.data);
      });
    } catch (err) {
      setSuccessMessage("");
      setErrorMessage("Error obtaining user info");
      console.error(`The error is ${err}`);
    }
  };

  return (
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
      <div>
        <h2>User token: {userToken}</h2>
        <p>ID: {userInfo._id}</p>
        <p>Username: {userInfo.username}</p>
        <p>Password: {userInfo.password}</p>
      </div>
    </div>
  );
};

export default Login;
