import React from "react";
import backgroundImage from '../../assets/images/background-image.png';
import "./login.css";

const Login = () => {
  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="login-box">
        <form>
        <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Login</button>
          </div>
        </form>
        <p className="version-text">version 1.0.0</p>
      </div>
    </div>
  );
};

export default Login;
