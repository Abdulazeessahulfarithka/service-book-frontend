import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../Services/api";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/user/login", user);

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success(data.message);

        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div
      className="container-fluid"
      style={{ background: "#f5f7fa", minHeight: "100vh" }}
    >
      <div className="row justify-content-center align-items-center vh-100">

        <div className="col-md-5 col-lg-4">

          <div className="card shadow-lg border-0 rounded-4">

            <div className="card-body p-5">

              <h2 className="text-center text-primary fw-bold mb-4">
                Login
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  className="btn btn-primary w-100"
                  type="submit"
                >
                  Login
                </button>

              </form>

              <p className="text-center mt-4">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-decoration-none fw-bold"
                >
                  Register
                </Link>
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;