import { useState } from "react";
import Axios from "axios";

const Register = () => {
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

  const handleOnSubmitRegister = async (event) => {
    event.preventDefault();
    try {
      await Axios.post("https://recipe-mern-app-server.herokuapp.com/users", {
        username: username,
        password: password,
      }).then(() => {
        setSuccessMessage("User successfully created");
        setUsername("");
        setPassword("");
        setErrorMessage("");
      });
    } catch (err) {
      setSuccessMessage("");
      setErrorMessage("User already exists");
      console.error(`The error is ${err}`);
    }
  };

  return (
    <>
      <form action="#" onSubmit={handleOnSubmitRegister}>
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
        <button>Register</button>
      </form>
      <div className="messages">
        <div>{successMessage}</div>
        <div>{errorMessage}</div>
      </div>
    </>
  );
};

export default Register;
