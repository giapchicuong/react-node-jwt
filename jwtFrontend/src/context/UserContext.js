import React, { createContext, useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = createContext(null);
const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const userDefault = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };
  const [user, setUser] = useState(userDefault);

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser({ ...userDefault, isLoading: false });
  };

  const fetchUserAccount = async () => {
    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;

      let data = {
        isLoading: false,
        isAuthenticated: true,
        token,
        account: {
          groupWithRoles,
          email,
          username,
        },
      };
      setUser(data);
    } else {
      setUser({ ...userDefault, isLoading: false });
    }
  };

  useEffect(() => {
    fetchUserAccount();
  }, []);

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
