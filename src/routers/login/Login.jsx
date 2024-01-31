import "./Login.css";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  function LOGIN(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let value = Object.fromEntries(formData);
    localStorage.setItem("userInfo", JSON.stringify(value));
    window.location = "/";
  }
  return (
    <div className="login">
      <form onSubmit={LOGIN}>
        <h1>Login</h1>
        <div className="email_id">
          <p>Email ID</p>
          <input
            name="username"
            autoFocus
            required
            type="text"
            placeholder="Email id"
          />
        </div>
        <div className="email_password">
          <p>Password</p>
          <input
            name="password"
            required
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="email_login">
          <button type="submit">Login</button>
          <p>Forgot password?</p>
        </div>
        <div className="email_google">
          <hr />
          <p>Login with</p>
        </div>
        <button>
          <FcGoogle />
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
