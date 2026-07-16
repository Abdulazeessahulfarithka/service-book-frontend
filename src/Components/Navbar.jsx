import { Link } from "react-router-dom";
import { FaTools, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top"
      style={{ padding: "15px 0" }}
    >
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold text-primary fs-3" to="/">
          <FaTools className="me-2" />
          DoorStepFix
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbar">

          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/services">
                Services
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/contact">
                Contact
              </Link>
            </li>

          </ul>

          {/* Right Buttons */}
          <div className="d-flex align-items-center">

            <Link
              to="/login"
              className="btn btn-outline-primary me-2"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-primary me-2"
            >
              Register
            </Link>

            <Link
              to="/profile"
              className="text-dark fs-3"
            >
              <FaUserCircle />
            </Link>

          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;