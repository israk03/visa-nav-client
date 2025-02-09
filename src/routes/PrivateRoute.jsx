import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  return user ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: { pathname: location.pathname } }}
    />
  );
};
