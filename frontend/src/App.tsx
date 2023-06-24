import { useState } from "react";

import { Route, Routes } from "react-router-dom";

import Login from "./Login";
import "./styles.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
