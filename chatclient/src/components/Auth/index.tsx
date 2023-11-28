import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Login } from "../../apiServices";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    let res = await Login({ email, password });
    if (res) {
      login();
      navigate("/home");
    }
  };

  return (
    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginForm;
