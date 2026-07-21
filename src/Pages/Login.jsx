import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import API from "../Services/api";
import { useAuth } from "../Context/AuthContext"; // Change path if needed

function Login() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Please enter your email";
      }

      if (!values.password) {
        errors.password = "Please enter your password";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        const login = await axios.post(`${API}api/user/login`, values);
        console.log(login)
        if (login.data.success) {
          toast.success("Login successful!");

          setAuth({ 
            ...auth,
            user: login.data.user,
            token: login.data.token,
          });

          localStorage.setItem("auth", JSON.stringify(login.data));

          navigate("/");
        } else {
          toast.error(login.data.message);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          toast.warn("Please register first");
        } else if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    },
  });

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

              <form onSubmit={formik.handleSubmit}>
                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.email && formik.errors.email && (
                    <small className="text-danger">
                      {formik.errors.email}
                    </small>
                  )}
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="form-label">Password</label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.password && formik.errors.password && (
                    <small className="text-danger">
                      {formik.errors.password}
                    </small>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
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
