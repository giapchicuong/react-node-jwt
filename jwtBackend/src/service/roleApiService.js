import db from "../models/index";

const getAllRole = async () => {
  try {
    let roles = await db.Role.findAll({
      order: [["id", "DESC"]],
    });
    if (roles) {
      return {
        EM: "Get roles success",
        EC: 0,
        DT: roles,
      };
    } else {
      return {
        EM: "Get roles success",
        EC: 0,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing went wrong in service...",
      EC: -2,
    };
  }
};

const createNewRoles = async (roles) => {
  try {
    let currentRoles = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });
    const persists = roles.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url2 === url1)
    );
    if (persists.length === 0) {
      return {
        EM: "Nothing to create...",
        EC: 0,
        DT: [],
      };
    }
    await db.Role.bulkCreate(persists);
    return {
      EM: `Create roles succeeds: ${persists.length} role ...`,
      EC: 0,
      DT: persists,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing went wrong in service ...",
      EC: -2,
    };
  }
};
const updateRole = async (role) => {
  try {
    let currentRole = await db.Role.findOne({
      where: { id: role.id },
    });
    const persists = role.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url2 === url1)
    );
    if (persists.length === 0) {
      return {
        EM: "Nothing to create...",
        EC: 0,
        DT: [],
      };
    }
    if (currentRole) {
      await role.update({
        url: role.url,
        description: role.description,
      });
      return {
        EM: "A role edited successfully",
        EC: 0,
        DT: role,
      };
    } else {
      return {
        EM: "Role not found",
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
const deleteRole = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: { id: id },
    });
    if (role) {
      await role.destroy();
      return {
        EM: "Delete role succeeds",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Role not exist",
        EC: 2,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing went wrong in service...",
      EC: -2,
    };
  }
};

const getRoleByGroup = async (id) => {
  try {
    let roles = await db.Group.findOne({
      where: { id: id },
      attributes: ["id", "name", "description"],
      include: {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    });
    if (roles) {
      return {
        EM: "Get Roles by group success",
        EC: 0,
        DT: roles,
      };
    } else {
      return {
        EM: "Not found any roles",
        EC: 0,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing went wrong in service...",
      EC: -2,
    };
  }
};

const assignRoleToGroup = async (data) => {
  try {
    await db.Group_Role.destroy({
      where: { groupId: +data.groupId },
    });
    await db.Group_Role.bulkCreate(data.groupRoles);
    return {
      EM: "Assign role to group succeeds",
      EC: 0,
      DT: [],
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing went wrong in service...",
      EC: -2,
    };
  }
};
module.exports = {
  createNewRoles,
  getAllRole,
  updateRole,
  deleteRole,
  getRoleByGroup,
  assignRoleToGroup,
};
