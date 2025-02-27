import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);  // State for toggling password visibility

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      window.alert(res.data.message);

      // Redirect based on roles
      if (formData.role === "farmer") {
        navigate("/farmer-dashboard");
      } else if (formData.role === "buyer") {
        navigate("/home");
      }
    } catch (error) {
      window.alert(error.response?.data?.error || "Registration failed");
    }
  };

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

  return (
    <div style={styles.authWrapper}>
      <header style={styles.header}>
        <h1>Farmer Friendly Web App</h1>
      </header>

      <div style={styles.authContainer}>
        <div style={styles.authCard}>
          <h2>Register</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Username:</label>
              <input type="text" name="name" placeholder="Enter your name" required onChange={handleChange} style={styles.input} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email:</label>
              <input type="email" name="email" placeholder="Enter your email" required onChange={handleChange} style={styles.input} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password:</label>
              <div style={styles.passwordInputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  onChange={handleChange}
                  style={styles.passwordInput}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeIconButton}
                >
                  {showPassword ? "🐵" : "🙈"}
                </button>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Role:</label>
              <select name="role" required onChange={handleChange} style={styles.input}>
                <option value="" disabled selected>
                  Select your role
                </option>
                <option value="farmer">Farmer</option>
                <option value="buyer">Buyer</option>
              </select>
            </div>

            <button type="submit" style={styles.button}>Register</button>
          </form>
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>

      <footer style={styles.footer}>
        <p>Agriculture - A Farmer Friendly Project</p>
        <p>©Agri</p>
      </footer>
    </div>
  );
};

const styles = {
    authWrapper: { display: "flex", flexDirection: "column", width: "100%", minHeight: "100vh" },
    header: { backgroundColor: "#4caf50", color: "white", textAlign: "center", padding: "0px", fontSize: "20px", fontWeight: "bold", width: "100%", position: "fixed", top: "0", left: "0", zIndex: "1000", display: "flex", justifyContent: "center", alignItems: "center" },
    authContainer: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 80px - 50px)", width: "100%", paddingTop: "70px" },  // Adjusted the height to consider navbar and footer height
    authCard: { background: "rgba(255, 255, 255, 0.95)", padding: "30px", borderRadius: "12px", boxShadow: "0 0 12px rgba(0, 0, 0, 0.2)", width: "400px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" },
    form: { width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" },
    inputGroup: { display: "flex", alignItems: "center", width: "100%", marginBottom: "12px" },
    label: { width: "120px", fontWeight: "bold", textAlign: "left" },
    input: { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "16px", marginLeft: "10px" },
    button: { width: "100%", padding: "12px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "18px", marginTop: "12px" },
    footer: { backgroundColor: "#4caf50", color: "white", textAlign: "center", padding: "10px", fontSize: "14px", fontWeight: "bold", width: "100%", position: "fixed", bottom: "0", left: "0", zIndex: "1000" },
    
    passwordInputWrapper: {
      position: "relative", 
      width: "100%",  // Ensure the wrapper has full width
      display: "flex",
      alignItems: "center",
    },
    
    passwordInput: {
      padding: "10px", 
      border: "1px solid #ccc", 
      borderRadius: "6px", 
      fontSize: "16px", 
      width: "100%",  // Ensure input itself takes full width
    },
    
    eyeIconButton: {
      position: "absolute", 
      right: "10px", 
      top: "50%", 
      transform: "translateY(-50%)", 
      background: "none", 
      border: "none", 
      color: "#4caf50", 
      cursor: "pointer",
      fontSize: "20px",
    },
  };
  
  

export default Register;
