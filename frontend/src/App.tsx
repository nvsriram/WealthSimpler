import { useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./pages/Login/Login";
import "./styles.css";

import { createAccount } from "./middleware/createAccount";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar";
import CreateOrg from "./pages/CreateOrg/CreateOrg";
import { useState } from "react";

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState("Organization Name");
  const { user, isAuthenticated } = useAuth0();

  console.log("User", user);
  console.log(createAccount());

  return (
    <div className="app">
      <Navbar />
      {isAuthenticated ? (
        <div className="main-container">
          <Routes>
            <Route
              path="/"
              element={
                currentStep >= 4 ? (
                  <Dashboard org={name} />
                ) : (
                  <CreateOrg
                    setOrg={setName}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                  />
                )
              }
            />
          </Routes>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
