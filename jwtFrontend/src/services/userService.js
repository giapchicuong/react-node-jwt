import axios from "../setup/axios";

const registerNewUser = (register) => {
  const { confirmPassword, ...dataWithoutConfirmPassword } = register;
  return axios.post("/api/v1/register", dataWithoutConfirmPassword);
};
const loginUser = (loginInputs) => {
  const { valueLogin, password } = loginInputs;
  return axios.post("/api/v1/login", {
    valueLogin,
    password,
  });
};
const logoutUser = () => {
  return axios.post("/api/v1/logout");
};

const fetchAllUser = (page, limit) => {
  return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
};
const createNewUser = (userData) => {
  return axios.post("/api/v1/user/create", {
    ...userData,
  });
};
const updateCurrentUser = (userData) => {
  return axios.put("/api/v1/user/update", {
    ...userData,
  });
};

const deleteUser = (user) => {
  return axios.delete("/api/v1/user/delete", {
    data: { id: user.id },
  });
};

const getUserAccount = () => {
  return axios.get(`/api/v1/account`);
};

// Group
const fetchAllGroup = () => {
  return axios.get("/api/v1/group/read");
};

export {
  registerNewUser,
  loginUser,
  logoutUser,
  fetchAllUser,
  createNewUser,
  updateCurrentUser,
  deleteUser,
  fetchAllGroup,
  getUserAccount,
};
