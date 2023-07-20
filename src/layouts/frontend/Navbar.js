import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Navbar = () => {
  const navigate = useNavigate();

  const logOut = (e) => {
    e.preventDefault();
    var config = {
      method: "POST",
      url: "http://localhost:8000/api/logout",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    };

    let res = axios(config)
      .then(function (response) {
        if (response.data.status === 200) {
          localStorage.clear();
          swal("Success", response.data.message, "success");
          navigate("/register");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(res);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="#">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/collection">
                Collection
              </Link>
            </li>

            {localStorage.getItem("auth_token") ? (
              <li className="nav-item">
                <Link
                  onClick={logOut}
                  className="nav-link btn btn-danger btn-sm text-white"
                  to="/register"
                >
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
