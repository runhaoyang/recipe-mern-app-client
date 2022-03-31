import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = ({ setIsLoggedIn }) => {
  useEffect(() => {
    localStorage.clear("userInfo");
    setIsLoggedIn(false);
  }, []);

  // Redirect to the home page after logging out
  return <>{<Navigate to="/" />}</>;
};

export default Logout;
