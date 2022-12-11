import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailForward } from "@fortawesome/free-solid-svg-icons";

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

const Login = ({
  setUserInfo,
  setUserToken,
  setIsLoggedIn,
  isLoggedIn,
  backendUrl,
}) => {
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

  const handleOnSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      await Axios.post(`${backendUrl}/auth`, {
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
      errorNotification();
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
      await Axios.get(`${backendUrl}/auth`, data).then((res) => {
        setUserInfo(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      });
    } catch (err) {
      console.error(`The error is ${err}`);
    }
  };

  const errorNotification = () => {
    toast.error("Invalid username or password.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/" />
      ) : (
        <>
          <StyledFormWrapper>
            <StyledForm action="#" onSubmit={handleOnSubmitLogin}>
              <h2> Login Form</h2>
              <label>
                Username
                <StyledInput
                  type="text"
                  placeholder=""
                  value={username}
                  onChange={handleOnChangeUsername}
                  autoFocus
                />
              </label>
              <label>
                Password
                <StyledInput
                  type="text"
                  value={password}
                  onChange={handleOnChangePassword}
                />
              </label>
              <StyledButton type="submit">
                <FontAwesomeIcon icon={faMailForward} />
                <>&nbsp;</>
                Login
              </StyledButton>
            </StyledForm>
            <ToastContainer limit={5} />
          </StyledFormWrapper>
        </>
      )}
    </>
  );
};

export default Login;
