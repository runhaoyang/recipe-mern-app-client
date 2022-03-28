import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = ({ setIsLoggedIn }) => {
  useEffect(() => {
    localStorage.clear("userInfo");
    setIsLoggedIn(false);
  }, []);

  return <>{<Navigate to="/" />}</>;
};

export default Logout;
