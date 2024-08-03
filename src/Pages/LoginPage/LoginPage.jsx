import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginPage = () => {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const LoginFunc = (e) => {
    e.preventDefault();
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phone,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          localStorage.setItem("token", data?.data?.tokens?.accessToken?.token);
          toast.success("Login success");
          navigate("/home");
        } else {
          toast.error(data?.message);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.message === "Token expired") {
          localStorage.removeItem("token");
        }
      });
  };
  return (
    <div>
      <h1>Welcome to Login Page</h1>
      <form onSubmit={LoginFunc}>
        <input
          onChange={(e) => setPhone(e?.target?.value)}
          type="text"
          required
          placeholder="number"
          minLength={3}
          autoComplete="off"
        />
        <input
          onChange={(e) => setPassword(e?.target?.value)}
          type="text"
          required
          placeholder="password"
          minLength={3}
          autoComplete="off"
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
