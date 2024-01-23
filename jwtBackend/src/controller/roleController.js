import roleApiService from "../service/roleApiService";

const readFunc = async (req, res) => {
  try {
    let data = await roleApiService.getAllRole();
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

const createFunc = async (req, res) => {
  try {
    let data = await roleApiService.createNewRoles(req.body);
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

const updateFunc = async (req, res) => {
  try {
    let data = await roleApiService.updateRole(req.body);
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

const deleteFunc = async (req, res) => {
  try {
    let data = await roleApiService.deleteRole(req.body.id);
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

const getRoleByGroup = async (req, res) => {
  try {
    let id = req.params.groupId;
    let data = await roleApiService.getRoleByGroup(id);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT, //date
    });
  } catch {
    return res.status(500).json({
      EM: "error from server", //error message
      EC: "-1", //error code
      DT: "", //date
    });
  }
};

const assignRoleToGroup = async (req, res) => {
  try {
    let data = await roleApiService.assignRoleToGroup(req.body.data);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT, //date
    });
  } catch {
    return res.status(500).json({
      EM: "error from server", //error message
      EC: "-1", //error code
      DT: "", //date
    });
  }
};
module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  getRoleByGroup,
  assignRoleToGroup,
};
