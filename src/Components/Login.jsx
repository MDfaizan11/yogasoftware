import React, { useState } from "react";
import "../Style/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  async function handleAdminLogin(e) {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, formData);

      console.log(response.data);
      const { token, role, branchId } = response.data;
      console.log(token);
      console.log(role);

      if (response.status === 200) {
        localStorage.setItem(
          "vijayansLogin",
          JSON.stringify({ token, role, branchId })
        );
        alert("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="login_wrapper">
        <div className="login_container">
          <div className="login_heading">Log In</div>
          <form className="login_form" onSubmit={handleAdminLogin}>
            <input
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="password_wrapper">
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={togglePasswordVisibility} className="eye_icon">
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </span>
            </div>
            <button className="login-button" style={{ cursor: "pointer" }}>
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
