import { useState } from "react";
import Axios from "axios";

const Login = () => {
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
      }).then(() => {
        setSuccessMessage("User successfully logged in.");
        setUsername("");
        setPassword("");
        setErrorMessage("");
      });
    } catch (err) {
      setSuccessMessage("");
      setErrorMessage("Invalid username or password");
      console.error(`The error is ${err}`);
    }
  };

  return (
    <>
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
    </>
  );
};

export default Login;
