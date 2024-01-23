import axios from "../setup/axios";

const createRoles = (roles) => {
  return axios.post("/api/v1/role/create", [...roles]);
};

const fetchAllRoles = () => {
  return axios.get("/api/v1/role/read");
};
const updateCurrentRole = (role) => {
  return axios.put("/api/v1/role/update", {
    ...role,
  });
};

const deleteRole = (role) => {
  return axios.delete("/api/v1/role/delete", { data: { id: role.id } });
};
// Group
const fetchRoleByGroup = (groupId) => {
  return axios.get(`/api/v1/role/by-group/${groupId}`);
};

const assignRolesToGroup = (data) => {
  return axios.post("/api/v1/role/assign-to-group", { data });
};

export {
  fetchAllRoles,
  createRoles,
  updateCurrentRole,
  deleteRole,
  fetchRoleByGroup,
  assignRolesToGroup,
};
