import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const ProtectedRouteForAuth = ({ children }) => {
  const token = localStorage.getItem("myUserId")
  
// console.log("token",token);

  if (token) {
    handleError("You're already logged in!", {
      position: "top-center",
      autoClose: 2000,
    });
    return <Navigate to="/chat" replace />;
  }
 

  return children;
  
};

export default ProtectedRouteForAuth;
