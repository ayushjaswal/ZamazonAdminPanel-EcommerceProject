import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state: RootState) => state.authUser.email);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  return loggedInUser ? children : null;
};

export default ProtectedRoute;
