import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/user/login", { username, password })
        .then((res) => {
          console.log(res);
          localStorage.setItem(
            "userInfo",
            JSON.stringify(res?.data?.innerdata)
          );
          navigate("/");
        })
        .catch((res) => console.log(res));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="email_id">
          <p>Username</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
