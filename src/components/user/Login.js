import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, userInfo } from "../../utils/auth";
import { API } from "../../utils/config";
import Layout from "../Layout";

const Login = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("jwt", JSON.stringify(token));
      window.location = "/user/dashboard";
    }
  }, []);

  const handleSocialLogin = (provider) => {
    const url = `${API}/auth/${provider}`;
    window.open(url, "_self");
  };

  const redirectUser = () => {
    if (isAuthenticated())
      return <Navigate to={`/${userInfo().role}/dashboard`} replace />;
  };

  return (
    <Layout title="Login" className="container col-md-6 offset-md-3 mt-5">
      {redirectUser()}

      <div className="card shadow-sm p-4">
        <h3 className="text-center mb-4">Login</h3>
        <div className="d-flex justify-content-center mb-3">
          <button
            onClick={() => handleSocialLogin("google")}
            className="btn btn-outline-success mx-2 d-flex align-items-center"
          >
            <img
              alt="Google Login"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png"
              style={{ width: "20px", marginRight: "10px" }}
            />
            Google
          </button>
          <button
            onClick={() => handleSocialLogin("facebook")}
            className="btn btn-outline-primary mx-2 d-flex align-items-center"
          >
            <img
              alt="Facebook Login"
              src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
              style={{ width: "20px", marginRight: "10px" }}
            />
            Facebook
          </button>
        </div>
        <hr />
        <p className="text-center">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
