import {
  FaHome,
  FaFileAlt,
  FaClipboardCheck,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="d-flex">

      {/* Sidebar */}
      <div
        className="d-flex flex-column p-3 bg-white shadow-sm"
        style={{
          width: "260px",
          minHeight: "100vh",
          borderRight: "1px solid #ffffff",
        }}
      >

        {/* Logo */}
        <div className="text-center mb-4">
          <h3 className="fw-bold text-primary">
            PTW System
          </h3>

          <small className="text-muted">
            Safety Management
          </small>
        </div>

        {/* User Info */}
        <div
          className="text-center mb-4 p-3"
          style={{
            background: "#ffffff",
            borderRadius: "12px",
          }}
        >
          <h5 className="fw-bold">
            Welcome
          </h5>

          <p className="mb-1 text-primary fw-bold">
            {user?.name}
          </p>

          <small className="text-muted">
            Role: {user?.role}
          </small>
        </div>

        {/* Menu */}
        <ul className="nav flex-column">

          <li className="nav-item mb-2">
            <Link
              to="/dashboard"
              className="nav-link text-dark fw-semibold"
            >
              <FaHome className="me-2" />
              Dashboard
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/permits"
              className="nav-link text-dark fw-semibold"
            >
              <FaFileAlt className="me-2" />
              Permit Records
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/create-permit"
              className="nav-link text-dark fw-semibold"
            >
              <FaPlusCircle className="me-2" />
              Create Permit
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/risk"
              className="nav-link text-dark fw-semibold"
            >
              <FaClipboardCheck className="me-2" />
              Risk Assessment
            </Link>
          </li>

        </ul>

        {/* Logout */}
        <div className="mt-auto">
          <button
            className="btn btn-danger w-100 rounded-pill"
            onClick={logout}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>

      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{
          background: "#abe7ff",
          minHeight: "100vh",
        }}
      >

        {/* Navbar */}
        <nav
          className="navbar bg-white shadow-sm"
          style={{
            height: "70px",
          }}
        >
          <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center w-100">

              <span className="fw-bold text-primary fs-4">
                Digital Permit-To-Work System
              </span>

              <span className="fw-semibold text-secondary">
                {user?.name} ({user?.role})
              </span>

            </div>

          </div>
        </nav>

        <div className="p-4">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;