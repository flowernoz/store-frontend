import { Outlet, Navigate, useLocation } from "react-router-dom";
const Auth = () => {
  let location = useLocation();
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  if (userInfo) return <Outlet />;
  else {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }
};
export default Auth;
