// PrivateRoute.js
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticatedAtom } from "../../atoms/IsAuthenticatedAtom";

function PrivateRoute() {
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const location = useLocation();

  return (
    isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  );
}

export default PrivateRoute;
