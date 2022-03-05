import { useState } from "react";
import Axios from "axios";

const App = () => {
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

  const handleOnSubmit = async (event) => {
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
    <div className="App">
      <div>
        <button onClick={callApi}>Get all users</button>
      </div>
      <br />
      <br />
      <form action="#" onSubmit={handleOnSubmit}>
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
      <div>{successMessage}</div>
      <div>{errorMessage}</div>
    </div>
  );
};

const callApi = async () => {
  const response = await fetch(
    "https://recipe-mern-app-server.herokuapp.com/users",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const res = await response.json();
  console.log(res);
};

export default App;
