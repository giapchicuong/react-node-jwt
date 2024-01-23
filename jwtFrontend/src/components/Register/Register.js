import React, { useContext, useEffect, useState } from "react";
import "./register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userService";
import { UserContext } from "../../context/UserContext";
function Register() {
  let history = useHistory();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user && user.isAuthenticated) {
      history.push("/");
    }
  }, []);

  const handleLogin = () => {
    history.push("./login");
  };

  const [register, setRegister] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    if (!register.email) {
      toast.error("Email is required");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    let regx = /^\S+@\S+\.\S+$/;
    if (!regx.test(register.email)) {
      toast.error("Please enter a valid email address");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!register.phone) {
      toast.error("Phone is required");
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      return false;
    }
    if (!register.password) {
      toast.error("Password is required");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    if (register.password !== register.confirmPassword) {
      toast.error("Your password is not the same");
      setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    let check = isValidInputs();
    if (check) {
      let response = await registerNewUser(register);
      let serverData = response;
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        history.push("/login");
      } else {
        toast.error(serverData.EM);
      }
    }
  };

  return (
    <div>
      <div className="register-container">
        <div className="container">
          <div className="row px-3 px-sm-0">
            <div className="content-left col-12 d-none col-sm-7 d-sm-block">
              <div className="brand">Facebook</div>
              <div className="detail">
                Facebook helps you connect and share with the people in your
                life.
              </div>
            </div>
            <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
              <div className="brand d-sm-none">Facebook</div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  className={
                    objCheckInput.isValidEmail
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Email Address"
                  id="email"
                  value={register.email}
                  onChange={(e) =>
                    setRegister({ ...register, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Phone number:</label>
                <input
                  type="text"
                  className={
                    objCheckInput.isValidPhone
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Phone number"
                  id="phone"
                  value={register.phone}
                  onChange={(e) =>
                    setRegister({ ...register, phone: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  id="username"
                  value={register.username}
                  onChange={(e) =>
                    setRegister({ ...register, username: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className={
                    objCheckInput.isValidPassword
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Password"
                  id="password"
                  value={register.password}
                  onChange={(e) =>
                    setRegister({ ...register, password: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Re-enter Password:</label>
                <input
                  type="password"
                  className={
                    objCheckInput.isValidConfirmPassword
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Re-enter Password"
                  id="confirmPassword"
                  value={register.confirmPassword}
                  onChange={(e) =>
                    setRegister({
                      ...register,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => handleRegister()}
              >
                Register
              </button>
              <span className="text-center">
                <a className="forgot-password" href="#">
                  Forgot your password?
                </a>
              </span>
              <div className="text-center">
                <button
                  className="btn btn-success"
                  onClick={() => handleLogin()}
                >
                  Already have an account. Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
