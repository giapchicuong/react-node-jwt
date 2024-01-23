import db from "../models/index";
import {
  hashUserPassword,
  checkEmailExist,
  checkPhoneExist,
} from "./loginRegisterService";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
    });
    if (users) {
      return {
        EM: "Get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "Get data success",
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

const getAllUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });
    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    return {
      EM: "Get Pagination successfully ...",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing went wrong in service ...",
      EC: -2,
    };
  }
};
const createNewUser = async (rawUserData) => {
  try {
    // check email /phone are exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist",
        EC: 1,
        DT: "email",
      };
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist) {
      return {
        EM: "The phone is already exist",
        EC: 1,
        DT: "phone",
      };
    }

    // hashPassword
    let hashPass = hashUserPassword(rawUserData.password);

    // create new user
    let data = await db.User.create({
      ...rawUserData,
      password: hashPass,
    });
    if (data) {
      return {
        EM: "New user created successfully",
        EC: 0,
        DT: data,
      };
    } else {
      return {
        EM: "Creating a new user failed",
        EC: 2,
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

const updateUser = async (rawUserData) => {
  try {
    if (!rawUserData.groupId) {
      return {
        EM: "Error with empty GroupId",
        EC: 1,
        DT: "group",
      };
    }
    // update new user
    let user = await db.User.findOne({
      where: { id: rawUserData.id },
    });

    if (user) {
      await user.update({
        username: rawUserData.username,
        sex: rawUserData.sex,
        address: rawUserData.address,
        groupId: rawUserData.groupId,
      });
      return {
        EM: "A user edited successfully",
        EC: 0,
        DT: user,
      };
    } else {
      return {
        EM: "User not found",
        EC: 2,
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

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (user) {
      await user.destroy();
      return {
        EM: "Delete user succeeds",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "User not exist",
        EC: 2,
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
  getAllUser,
  getAllUserWithPagination,
  deleteUser,
  createNewUser,
  updateUser,
};
