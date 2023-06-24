import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./pages/Login/Login";
import "./styles.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar";

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="app">
      <Navbar />
      {isAuthenticated ? (
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
          </Routes>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
