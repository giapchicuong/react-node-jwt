import db from "../models/index";

const getAllGroup = async () => {
  try {
    let groups = await db.Group.findAll({
      attributes: ["id", "name", "description"],
    });
    if (groups) {
      return {
        EM: "Get group success",
        EC: 0,
        DT: groups,
      };
    } else {
      return {
        EM: "Get group fail",
        EC: 0,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing went wrong in service ...",
      EC: -2,
    };
  }
};
module.exports = {
  getAllGroup,
};
