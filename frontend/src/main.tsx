import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Login from "./Login.tsx";
import CreateOrg from "./CreateOrg.tsx";
import "./index.css";
import Users from "./Users";
import Strategy from "./Strategy.tsx";
import Gas from "./Gas.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Gas />
  </React.StrictMode>
);
