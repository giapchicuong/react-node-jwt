import loginRegisterService from "../service/loginRegisterService";
const testApi = (req, res) => {
  return res.status(200).json({
    message: "oke",
    data: "test api",
  });
};
const handleRegister = async (req, res) => {
  try {
    // Check required server
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required parameters", //error message
        EC: "1", //error code
        DT: "", //date
      });
    }
    if (!req.body.password && !req.body.password.length < 4) {
      return res.status(200).json({
        EM: "Your password must have more than 3 letters", //error message
        EC: "1", //error code
        DT: "", //date
      });
    }
    // service :create user
    let data = await loginRegisterService.registerNewUser(req.body);

    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: "", //date
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server", //error message
      EC: "-1", //error code
      DT: "", //date
    });
  }
};
const handleLogin = async (req, res) => {
  try {
    // service :login user
    let data = await loginRegisterService.handleUserLogin(req.body);
    // set cookie
    if (data && data.DT && data.DT.access_token) {
      res.cookie("jwt", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT, //date
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server", //error message
      EC: "-1", //error code
      DT: "", //date
    });
  }
};

const handleLogout = async (req, res) => {
  try {
    // clear cookie
    res.clearCookie("jwt");
    return res.status(200).json({
      EM: "Log out success", //error message
      EC: 0, //error code
      DT: "", //date
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server", //error message
      EC: "-1", //error code
      DT: "", //date
    });
  }
};
module.exports = {
  testApi,
  handleRegister,
  handleLogin,
  handleLogout,
};
