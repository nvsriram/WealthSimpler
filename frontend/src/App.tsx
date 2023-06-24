import { useState } from "react";

import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Login from "./Login";
import Users from "./Users";
import "./styles.css";

function App() {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div className="App">
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
}

export default App;
