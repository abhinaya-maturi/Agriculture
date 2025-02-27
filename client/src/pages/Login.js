import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Default to empty for role
  const navigate = useNavigate();

  // Background setup
  useEffect(() => {
    document.body.style.background = `url('/images/background.jpg') no-repeat center center/cover`;
    document.body.style.minHeight = "100vh";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";

    return () => {
      document.body.style.background = "";
    };
  }, []);

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role before logging in.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role, // Send role during login
      });

      const { token } = response.data;

      // Store token and user role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);

      alert("Login successful!");

      // Navigate based on the selected role
      if (role === "buyer") {
        navigate("/home"); // Buyer home page
      } else if (role === "farmer") {
        navigate("/farmer-dashboard"); // Farmer dashboard
      } else {
        alert("Invalid role selected!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.error || "Login failed!");
    }
  };

  return (
    <div className="auth-wrapper">
      <header>
        <h1>Farmer Friendly Web App</h1>
      </header>

      <div className="auth-container">
        <div className="auth-card">
          <h2>Login</h2>
          <br />
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password:</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🐵" : "🙈"}
                </span>
              </div>
            </div>

            <div className="input-group">
              <label>Role:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="" disabled>
                  Select your role
                </option>
                <option value="farmer">Farmer</option>
                <option value="buyer">Buyer</option>
              </select>
            </div>

            <button type="submit">Login</button>
          </form>
          <br />
          <p>
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </div>
      </div>

      <footer>
        <p>Agriculture - A Farmer Friendly Project</p>
        <p>©Agri</p>
      </footer>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .auth-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 100vh;
        }

        header {
          background-color: #4caf50;
          color: white;
          text-align: center;
          padding: 15px;
          font-size: 24px;
          font-weight: bold;
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
        }

        .auth-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100%;
          padding-top: 70px;
        }

        .auth-card {
          background: rgba(255, 255, 255, 0.95);
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
          width: 400px;
          text-align: center;
        }

        .input-group {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
          width: 100%;
        }

        .input-group label {
          font-size: 16px;
          font-weight: bold;
          min-width: 90px;
          text-align: left;
        }

        input, select {
          flex-grow: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 16px;
          width: 100%;
        }

        .password-container {
          position: relative;
          width: 100%;
        }

        .password-container input {
          width: 100%;
          padding-right: 40px;
        }

        .eye-icon {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          font-size: 18px;
        }

        button {
          width: 100%;
          padding: 14px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 18px;
          margin-top: 15px;
        }

        button:hover {
          background-color: #45a049;
        }

        footer {
          background-color: #4caf50;
          color: white;
          text-align: center;
          padding: 12px;
          font-size: 16px;
          font-weight: bold;
          width: 100%;
          position: fixed;
          bottom: 0;
          left: 0;
          z-index: 1000;
        }
      `}</style>
    </div>
  );
};

export default Login;
