import { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        setUsername("");
        setPassword("");
        successRegistering();
      });
    } catch (err) {
      console.error(`The error is ${err}`);
      errorRegistering();
    }
  };

  const errorRegistering = () => {
    toast.error("User already exists.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const successRegistering = () => {
    toast.success("User successfully created.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  return (
    <div className="registerContent">
      <form action="#" onSubmit={handleOnSubmitRegister}>
        <div className="usernameField">
          <label>
            Username:{" "}
            <input
              className="textInput"
              type="text"
              placeholder=""
              value={username}
              onChange={handleOnChangeUsername}
            />
          </label>
        </div>
        <div className="passwordField">
          <label>
            Password:{" "}
            <input
              className="textInput"
              type="text"
              placeholder=""
              value={password}
              onChange={handleOnChangePassword}
            />
          </label>
        </div>
        <div className="submitField">
          <button>Register</button>
        </div>
      </form>
      <ToastContainer limit={5} />
    </div>
  );
};

export default Register;
