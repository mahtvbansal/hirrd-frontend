/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "@/context/AccountContext";

const ProtectedRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { user } = useContext(AccountContext);

  if (localStorage.getItem("jwt")) {
    if (pathname !== "/onboarding" && user && !user.role)
      return <Navigate to="/onboarding" />;

    if (pathname === "/onboarding" && user?.role) {
      return <Navigate to={user?.role === "recruiter" ? "/post-job" : "/jobs"} />;
    }

    return children;
  }
  return <Navigate to="/" />;
};

export default ProtectedRoute;
