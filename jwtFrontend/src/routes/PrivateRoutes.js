import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";
function PrivateRoutes(props) {
  const { user } = useContext(UserContext);
  if (user && user.isAuthenticated) {
    return (
      <>
        <Route path={props.path} component={props.component} />
      </>
    );
  } else {
    return <Redirect to="/login"></Redirect>;
  }
}

export default PrivateRoutes;
