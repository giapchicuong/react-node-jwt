import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  // cach moi dung ORM
  let hashPass = hashUserPassword(password);
  try {
    await db.User.create({
      email: email,
      password: hashPass,
      username: username,
    });
  } catch (e) {
    console.log(e);
  }
  // cach cu to create user by mysql
  // let hashPass = hashUserPassword(password);
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "INSERT INTO user (email, password, username) VALUES (?, ?, ?)",
  //     [email, hashPass, username]
  //   );
  // } catch (e) {
  //   console.log(e);
  // }
};

const getUserList = async () => {
  // eager loading
  let newUser = await db.User.findOne({
    where: { id: 5 },
    attributes: ["id", "username", "email"],
    include: { model: db.Group, attributes: ["name", "description"] },
    raw: true,
    nest: true,
  });
  let role = await db.Role.findAll({
    include: {
      model: db.Group,
      where: { id: 1 },
    },
    raw: true,
    nest: true,
  });
  console.log("check user", newUser);
  // console.log("check role", role);

  // cach moi dung ORM
  let users = [];
  users = await db.User.findAll();
  return users;
  // cach cu get user by mysql
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // let users = [];
  // try {
  //   const [rows, fields] = await connection.execute("SELECT * FROM USER");
  //   return rows;
  // } catch (e) {
  //   console.log(e);
  // }
};
const deleteUser = async (userId) => {
  // cach moi dung ORM
  try {
    await db.User.destroy({
      where: { id: userId },
    });
  } catch (e) {
    console.log(e);
  }
  // cach cu delete user by mysql
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "DELETE FROM USER WHERE ID=?",
  //     [id]
  //   );
  // } catch (e) {
  //   console.log(e);
  // }
};
const getUserById = async (userId) => {
  // cach moi dung ORM
  try {
    let user = {};
    user = await db.User.findOne({ where: { id: userId } });
    return user.get({ plain: true });
  } catch (e) {
    console.log(e);
  }
  // cach cu getID user by mysql
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "SELECT * FROM USER where id = ?",
  //     [id]
  //   );
  //   return rows;
  // } catch (e) {
  //   console.log(e);
  // }
};
const updateUser = async (email, username, id) => {
  // cach moi dung ORM
  try {
    await db.User.update(
      { email: email, username: username },
      { where: { id: id } }
    );
  } catch (e) {
    console.log(e);
  }
  // cach cu updateUser user by mysql
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "UPDATE user SET email=?,username=? where id=?",
  //     [email, username, id]
  //   );
  //   return rows;
  // } catch (e) {
  //   console.log(e);
  // }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUser,
};
