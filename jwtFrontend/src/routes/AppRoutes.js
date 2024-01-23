import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import User from "../components/ManageUsers/User";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";
function AppRoutes() {
  const Projects = () => {
    return <span>projects</span>;
  };
  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={User} />
        <PrivateRoutes path="/roles" component={Role} />
        <PrivateRoutes path="/group-role" component={GroupRole} />
        <PrivateRoutes path="/projects" component={Projects} />

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/" exact>Home</Route>
        <Route path="*">
          <div className="container">404 not Error...</div>
        </Route>
      </Switch>
    </>
  );
}

export default AppRoutes;
