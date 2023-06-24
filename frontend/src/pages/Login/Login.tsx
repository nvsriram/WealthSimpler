import { useAuth0 } from "@auth0/auth0-react";
import "./Login.css";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-container">
      <h1>WealthSimpler</h1>
      <div className="form-container">
        <input type="text" placeholder="Email" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
        <button onClick={() => loginWithRedirect()} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
