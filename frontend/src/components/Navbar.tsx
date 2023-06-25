import { useAuth0 } from "@auth0/auth0-react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth0();
  return (
    <nav className="navbar">
      {isAuthenticated && (
        <AwesomeButton
          onPress={() => logout()}
          className="navbar-button"
          type="whatsapp"
        >
          Logout
        </AwesomeButton>
      )}
      <h1>
        WealthSimple<span>r</span>
      </h1>
    </nav>
  );
};

export default Navbar;
