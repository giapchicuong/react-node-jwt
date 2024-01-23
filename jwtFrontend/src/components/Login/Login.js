import React, { useContext, useEffect, useState } from "react";
import "./login.scss";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
function Login() {
  let history = useHistory();

  const { loginContext, user } = useContext(UserContext);

  const [loginInputs, SetLoginInputs] = useState({
    valueLogin: "",
    password: "",
  });
  const defaultValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const handleCreateNewAccount = () => {
    history.push("./register");
  };

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    if (!loginInputs.valueLogin) {
      toast.error("Please enter your email or phone number");
      setObjCheckInput({ ...defaultValidInput, isValidValueLogin: false });
      return false;
    }
    if (!loginInputs.password) {
      toast.error("Please enter your password");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    let check = isValidInputs();
    if (check) {
      let response = await loginUser(loginInputs);
      let serverData = response;
      if (response && serverData && +serverData.EC === 0) {
        let groupWithRoles = response.DT.groupWithRoles;
        let email = response.DT.email;
        let username = response.DT.username;
        let token = response.DT.access_token;
        let data = {
          isAuthenticated: true,
          token,
          account: { groupWithRoles, email, username },
        };
        // window.location.pathname = "/users";
        // localStorage.setItem("jwt", token);

        loginContext(data);

        toast.success(serverData.EM);
        history.push("./users");
      } else {
        toast.error(serverData.EM);
      }
    }
  };
  const handlePressEnter = (e) => {
    if (e.charCode === 0 && e.code === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if (user && user.isAuthenticated) {
      history.push("/");
    }
  }, []);
  return (
    <div>
      <div className="login-container">
        <div className="container">
          <div className="row px-3 px-sm-0">
            <div className="content-left col-12 d-none col-sm-7 d-sm-block">
              <div className="brand">
                <Link to="/">
                  <span title="Return to home page">Facebook</span>
                </Link>
              </div>
              <div className="detail">
                Facebook helps you connect and share with the people in your
                life.
              </div>
            </div>
            <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
              <div className="brand d-sm-none">Facebook</div>
              <input
                type="text"
                className={
                  objCheckInput.isValidValueLogin
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Email Address or phone number"
                id="valueLogin"
                value={loginInputs.valueLogin}
                onChange={(e) =>
                  SetLoginInputs({ ...loginInputs, valueLogin: e.target.value })
                }
              />
              <input
                type="password"
                className={
                  objCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Password"
                id="password"
                value={loginInputs.password}
                onChange={(e) =>
                  SetLoginInputs({ ...loginInputs, password: e.target.value })
                }
                onKeyDown={(e) => handlePressEnter(e)}
              />
              <button className="btn btn-primary" onClick={() => handleLogin()}>
                Login
              </button>
              <span className="text-center">
                <a className="forgot-password" href="#">
                  Forgot your password?
                </a>
              </span>
              <div className="text-center">
                <button
                  className="btn btn-success"
                  onClick={() => handleCreateNewAccount()}
                >
                  Create new account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
