import groupService from "../service/groupService";

const readFunc = async (req, res) => {
  let data = await groupService.getAllGroup();
  if (data) {
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT, //date
    });
  }
  try {
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from server", //error message
      EC: "-1", //error code
      DT: "", //date
    });
  }
};
module.exports = {
  readFunc,
};
