import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (localStorage.getItem("token")) {
          // render component
          return <Component />;
        } else {

          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default PrivateRoute;
