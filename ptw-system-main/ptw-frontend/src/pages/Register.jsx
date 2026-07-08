import "../styles/login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("worker");

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
  console.log("FULL ERROR:", error);
  console.log("MESSAGE:", error.message);
  console.log("RESPONSE:", error.response);

  alert(error.message);
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

      <h2>Register</h2>

      <form onSubmit={registerUser}>

        <input
          type="text"
          placeholder="👤 Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

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

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            fontSize: "15px"
          }}
        >
          <option value="worker">
            Worker
          </option>

          <option value="supervisor">
            Supervisor
          </option>

          <option value="safety">
            Safety
          </option>

          <option value="manager">
            Manager
          </option>
        </select>

        <button type="submit">
          Register
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;