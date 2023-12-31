import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
import Navbar from "../../../layouts/frontend/Navbar";

const Register = () => {
  const [registerInput, setRegisterInput] = useState({
    name: "",
    email: "",
    password: "",
    error_list: [],
  });
  const handleInput = (e) => {
    e.persist();
    setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");
        } else {
          setRegisterInput({
            ...registerInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };
  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Register</h4>
              </div>
              <div className="card-body">
                <form onSubmit={registerSubmit}>
                  <div className="form-group mb-3">
                    <label>Name</label>
                    <input
                      type=""
                      className="form-control"
                      name="name"
                      onChange={handleInput}
                      value={registerInput.name}
                    />
                    <span>{registerInput.error_list.name}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={handleInput}
                      value={registerInput.email}
                    />
                    <span>{registerInput.error_list.email}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={handleInput}
                      value={registerInput.password}
                    />
                    <span>{registerInput.error_list.password}</span>
                  </div>
                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
