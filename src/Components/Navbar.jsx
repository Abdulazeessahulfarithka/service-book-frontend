import { Link } from "react-router-dom";
import { FaTools, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-2xl font-bold text-blue-600"
        >
          <FaTools className="mr-2" />
          DoorStepFix
        </Link>

        {/* Menu */}
        <div className="hidden md:flex space-x-8">

          <Link
            to="/"
            className="font-semibold hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/services"
            className="font-semibold hover:text-blue-600 transition"
          >
            Services
          </Link>

          <Link
            to="/about"
            className="font-semibold hover:text-blue-600 transition"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="font-semibold hover:text-blue-600 transition"
          >
            Contact
          </Link>

        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3">

          <Link
            to="/login"
            className="px-4 py-2 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </Link>

          <Link
            to="/profile"
            className="text-3xl text-gray-700 hover:text-blue-600"
          >
            <FaUserCircle />
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;