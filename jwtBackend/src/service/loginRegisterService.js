require("dotenv").config();
import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);
import { Op } from "sequelize";

import { getGroupWithRoles } from "./JwtService";

import { createJwt } from "../middleware/JwtAction";

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
// Check email
const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });
  if (user) {
    return true;
  }
  return false;
};
// Check Phone
const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });
  if (user) {
    return true;
  }
  return false;
};

const registerNewUser = async (rawUserData) => {
  try {
    // check email /phone are exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist",
        EC: 1,
      };
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist) {
      return {
        EM: "The phone is already exist",
        EC: 1,
      };
    }
    // hash pass
    let hashPass = hashUserPassword(rawUserData.password);

    // create new user
    await db.User.create({
      email: rawUserData.email,
      password: hashPass,
      username: rawUserData.username,
      phone: rawUserData.phone,
      groupId: 4,
    });
    return {
      EM: "A user is created successfully",
      EC: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing went wrong in service ...",
      EC: -2,
    };
  }
};
const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};
const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });
    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword) {
        // let token

        // test roles

        let groupWithRoles = await getGroupWithRoles(user);

        let payload = {
          email: user.email,
          groupWithRoles,
          username: user.username,
        };
        let token = createJwt(payload);
        return {
          EM: "Login successfully",
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles: groupWithRoles,
            email: user.email,
            username: user.username,
          },
        };
      }
    }
    return {
      EM: "Your email/phone number or password is incorrect!",
      EC: 1,
      DT: "",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing went wrong in service ...",
      EC: -2,
    };
  }
};
module.exports = {
  registerNewUser,
  handleUserLogin,
  hashUserPassword,
  checkPhoneExist,
  checkEmailExist,
};
