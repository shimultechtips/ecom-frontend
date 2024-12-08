import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import { API } from "../../utils/config";
import Layout from "../Layout";

const Register = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("jwt", JSON.stringify(token));
      window.location.reload();
    }
  }, []);

  const handleSocialRegister = (provider) => {
    const url = `${API}/auth/${provider}`;
    window.open(url, "_self");
  };

  return (
    <Layout title="Register" className="container col-md-6 offset-md-3 mt-5">
      {isAuthenticated() && <Navigate to="/" replace />}

      <div className="card shadow-sm p-4">
        <h3 className="text-center mb-4">Register Your Account</h3>
        <div className="mb-3">
          <button
            onClick={() => handleSocialRegister("google")}
            className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png"
              alt="Google"
              style={{ width: "20px", marginRight: "10px" }}
            />
            Register with Google
          </button>
        </div>
        <div className="mb-3">
          <button
            onClick={() => handleSocialRegister("facebook")}
            className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
              alt="Facebook"
              style={{ width: "20px", marginRight: "10px" }}
            />
            Register with Facebook
          </button>
        </div>
        <p className="text-center mt-3">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
