import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated, signout, userInfo } from "../utils/auth";

const isActive = (location, path) => {
  return location.pathname === path ? { color: "#ff9900" } : { color: "white" };
};

const Menu = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MyApp
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            onClick={toggleSidebar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-none d-lg-flex">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(location, "/")}
                  to="/"
                >
                  Home
                </Link>
              </li>
              {!isAuthenticated() && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={isActive(location, "/login")}
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={isActive(location, "/register")}
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
              {isAuthenticated() && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={isActive(
                        location,
                        `/${userInfo().role}/dashboard`
                      )}
                      to={`/${userInfo().role}/dashboard`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={isActive(location, "/cart")}
                      to="/cart"
                    >
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      style={{ cursor: "pointer", color: "grey" }}
                      onClick={() => {
                        signout(() => {
                          navigate("/login");
                        });
                      }}
                    >
                      Log Out
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar for Mobile View */}
      <div
        className={`offcanvas offcanvas-end ${showSidebar ? "show" : ""}`}
        style={{
          visibility: showSidebar ? "visible" : "hidden",
          transform: showSidebar ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease, visibility 0.3s ease",
        }}
      >
        <div className="offcanvas-header bg-dark text-white">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={toggleSidebar}
          ></button>
        </div>
        <div className="offcanvas-body bg-dark text-white">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(location, "/")}
                to="/"
                onClick={toggleSidebar}
              >
                Home
              </Link>
            </li>
            {!isAuthenticated() && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive(location, "/login")}
                    to="/login"
                    onClick={toggleSidebar}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive(location, "/register")}
                    to="/register"
                    onClick={toggleSidebar}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated() && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive(location, `/${userInfo().role}/dashboard`)}
                    to={`/${userInfo().role}/dashboard`}
                    onClick={toggleSidebar}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive(location, "/cart")}
                    to="/cart"
                    onClick={toggleSidebar}
                  >
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    style={{ cursor: "pointer", color: "grey" }}
                    onClick={() => {
                      signout(() => {
                        navigate("/login");
                        toggleSidebar();
                      });
                    }}
                  >
                    Log Out
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Menu;
