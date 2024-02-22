import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useLogInMutation } from "../../redux/userApi";
import { toast } from "react-toastify";
import BtnLoader from "../../components/btnLoader/BtnLoader";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Login = () => {
  const [logIn, { isSuccess }] = useLogInMutation();
  const [clickEye, setClickEye] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    try {
      const res = await logIn(data);
      if (!res?.data?.success) {
        toast.error(`Bunday ${data?.username} foydalanuvchi yaratilmagan`, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
        });
        e.target.reset();
        return;
      }
      sessionStorage.setItem("userInfo", JSON.stringify(res?.data?.innerData));
      console.log(res?.data);
      toast.success("Muofaqqiyatli urunish", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
      });
      e.target.reset();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="email_id">
          <p>Username</p>
          <input
            name="username"
            autoFocus
            required
            type="text"
            autoComplete="username"
          />
        </div>
        <div className="email_password">
          <p>Password</p>
          <div className="password_container">
            <input
              name="password"
              required
              type={clickEye ? "text" : "password"}
              autoComplete="current-password"
            />
            <span
              onClick={() => setClickEye(!clickEye)}
              className="input_eye_button"
            >
              {clickEye ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </span>
          </div>
        </div>
        <div className="email_login">
          <button disabled={isSuccess} type="submit">
            {isSuccess ? <BtnLoader /> : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
