import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  console.log('my log: ', isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" />;
}