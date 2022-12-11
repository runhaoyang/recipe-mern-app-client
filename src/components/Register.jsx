import { useState, useEffect } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  padding: 0 20px;

  & .Toastify__toast-body {
    white-space: pre-line;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  display: block;
  background-color: #e76f51;
  color: #fff;
  font-size: 1em;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    adminInfoNotification();
  }, []);

  const adminInfoNotification = () => {
    toast.info(
      `For demonstration purposes, administrator login information is listed below:
      
      username: admin
      passsword: adminpassword`,
      {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        enableHtml: true,
      }
    );
  };

  const handleOnChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnSubmitRegister = async (event) => {
    event.preventDefault();
    try {
      await Axios.post("https://recipe-mern-app-server.onrender.com/users", {
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
    <>
      <StyledFormWrapper>
        <StyledForm action="#" onSubmit={handleOnSubmitRegister}>
          <h2>Registration Form</h2>
          <label>
            Username{" "}
            <StyledInput
              type="text"
              name="username"
              value={username}
              placeholder=""
              onChange={handleOnChangeUsername}
              autoFocus
            />
          </label>

          <label>
            {" "}
            Password{" "}
            <StyledInput
              type="text"
              name="password"
              value={password}
              placeholder=""
              onChange={handleOnChangePassword}
            />
          </label>
          <StyledButton type="submit">
            <FontAwesomeIcon icon={faUserPlus} />
            <>&nbsp;</>
            Register
          </StyledButton>
        </StyledForm>
        <ToastContainer limit={5} />
      </StyledFormWrapper>
    </>
  );
};

export default Register;
