import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./pages/Login/Login";
import Users from "./pages/Users/Users";
import "./styles.css";

const App = () => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <Routes>
            <Route path="/" element={<Users />}></Route>
          </Routes>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
