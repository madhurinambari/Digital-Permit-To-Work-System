import "../styles/login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem(
        "token",
        res.data.token
      );

      // Save user details
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");

      // Redirect to Dashboard
      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

 return (
  <div className="login-container">

    <div className="logo">
    </div>

    <h1>PTW System</h1>

    <p className="subtitle">
      Digital Permit To Work Management
    </p>

    <h2>Login</h2>

    <form onSubmit={loginUser}>

      <input
        type="email"
        placeholder="📧 Enter Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        required
      />

      <input
        type="password"
        placeholder="🔒 Enter Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        required
      />

      <button type="submit">
        Login
      </button>

      <p>
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>

    </form>

  </div>
);
}

export default Login;