import React, { useEffect } from "react";
import "./App.css";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./Pages/HomePage/HomePage";

function App() {
  let tokenPr = localStorage.getItem("token");
  let navigate = useNavigate();
  useEffect(() => {
    if (tokenPr.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1")) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Routes>
        {tokenPr ? (
          <Route path="/home" element={<HomePage />} />
        ) : (
          <Route path="/" element={<LoginPage />} />
        )}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
