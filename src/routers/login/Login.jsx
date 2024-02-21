import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api";
import "./Login.css";
import { Link } from "react-router-dom";
import { useLogInMutation } from "../../redux/userApi";
import { toast } from "react-toastify";

const Login = () => {
  const [logIn] = useLogInMutation();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    localStorage.setItem("userInfo", JSON.stringify(data));

    try {
      const res = await logIn(data);
      if (!res?.data?.success) {
        toast.error(`Bunday ${data?.username} foydalanuvchi yartilmagan`, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
        });
        e.target.reset();
        return;
      }
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
            placeholder="username"
            autoComplete="username"
          />
        </div>
        <div className="email_password">
          <p>Password</p>
          <input
            name="password"
            required
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
        </div>
        <div className="email_login">
          <button type="submit">Login</button>
          <p>Forgot password?</p>
        </div>
        <div className="email_google">
          <hr />
          <Link to={"/registration"}>Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
