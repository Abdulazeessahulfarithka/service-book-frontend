import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import API from "../Services/api";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      address: "",
    },

    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Please enter your name";
      }

      if (!values.email) {
        errors.email = "Please enter your email";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Please enter your password";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }

      if (!values.address) {
        errors.address = "Please enter your address";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        const register = await axios.post(`${API}/api/user/register`, values);

        if (register.data.success) {
          toast.success(register.data.message);
          navigate("/login");
        } else {
          toast.error(register.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Registration failed");
      }
    },
  });

  return (
    <div
      className="container-fluid"
      style={{ background: "#f5f7fa", minHeight: "100vh" }}
    >
      <div className="row justify-content-center py-5">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow border-0 rounded-4">
            <div className="card-body p-5">
              <h2 className="text-center text-primary fw-bold mb-4">
                Create Account
              </h2>

              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  {/* Name */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Full Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <small className="text-danger">
                        {formik.errors.name}
                      </small>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
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
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
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

                  {/* Address */}
                  <div className="col-12 mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="House No, Street, Area"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <small className="text-danger">
                        {formik.errors.address}
                      </small>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>

              <p className="text-center mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-decoration-none fw-bold">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;