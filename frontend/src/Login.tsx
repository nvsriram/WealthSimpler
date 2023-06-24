import React from "react";
import "./Login.css";

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <h1>WealthSimpler</h1>
      <div className="form-container">
        <input type="text" placeholder="Email" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
        <button className="login-button">Login</button>
        <button className="signup-button">Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
