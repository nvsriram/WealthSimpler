import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./pages/Login/Login";
import "./styles.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar";
import CreateOrg from "./pages/CreateOrg/CreateOrg";
import Strategy from "./pages/Strategy/Strategy";
import Users from "./pages/Users/Users";
import Gas from "./pages/Gas/Gas";

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="app">
      <Navbar />
      {isAuthenticated ? (
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/new" element={<CreateOrg />}></Route>
            <Route path="/strategy" element={<Strategy />}></Route>
            <Route path="/gas" element={<Gas />}></Route>
            <Route path="/users" element={<Users />}></Route>
          </Routes>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
