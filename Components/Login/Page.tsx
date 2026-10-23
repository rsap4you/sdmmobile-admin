"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import { useAppDispatch } from "@/redux/store";
import { LoginUser } from "@/redux/auth/auth-action";

const schema = yup.object().shape({
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: schema,
    onSubmit: (values) => {
      setLoading(true);
      dispatch(LoginUser({ values, navigate, dispatch })).then(() => setLoading(false));
    },
  });

  const invalid = formik.touched.password && formik.errors.password;

  return (
    <div className="auth-main">
      <div className="auth-wrapper v1">
        <div className="auth-form">
          <div className="card">
            <div className="card-body">
              <div className="text-center mb-4">
                <h3 className="fw-bold mb-1">SDM Admin</h3>
                <p className="text-muted mb-0">Shree Dhandai Mata Mobile</p>
              </div>
              <h5 className="text-center f-w-500 mt-3">Enter the admin password</h5>

              <form className="row g-3" onSubmit={formik.handleSubmit}>
                <div className="form-group mb-3">
                  <div className="input-group has-validation">
                    <input
                      type={show ? "text" : "password"}
                      name="password"
                      className={`form-control py-3 ${invalid ? "is-invalid" : ""}`}
                      placeholder="Password"
                      autoComplete="current-password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {invalid && <div className="invalid-feedback">{formik.errors.password}</div>}
                  </div>
                </div>
                <div className="d-grid mt-3 gap-2">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    Login
                    {loading && <BiLoaderCircle className="search_loader_box ms-2" />}
                  </button>
                </div>
                <p className="text-muted text-center small mb-0">
                  The server may take a few seconds to wake up on the first login.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
