import { useAuth0 } from "@auth0/auth0-react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./Login.css";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-container">
      <h1>Login in to your organization using Auth0</h1>
      <AwesomeButton
        onPress={() => loginWithRedirect()}
        className="login-button"
      >
        Login
      </AwesomeButton>
    </div>
  );
};

export default Login;
