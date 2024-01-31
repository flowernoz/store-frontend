import { Outlet, Navigate } from "react-router-dom";
const Auth = () => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let auth = userInfo?.username === "admin" && userInfo?.password === "admin";
  if (auth) return <Outlet />;
  else {
    return <Navigate to={"/login"} />;
  }
};
export default Auth;
