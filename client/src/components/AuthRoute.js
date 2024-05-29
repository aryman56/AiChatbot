import { Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
const AuthRoute = ({ element, ...rest }) => {
  const navigate = useNavigate();

  // Check if user is authenticated by looking for authToken in local storage
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    // If authToken is not found, redirect to login page and display message
    navigate("/login");
    toast.error("Please login first");
    return <Navigate to="/login" replace />;
  }

  return <Route {...rest} element={element} />;
};

export default AuthRoute;
