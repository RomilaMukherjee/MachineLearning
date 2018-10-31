import React from "react";
import { Route } from "react-router-dom";
import Chart from "./Chart";
import Login from "./containers/Login";

const BaseRouter = () => (
  <div>
    <Route exact path="/login/" component={Login} />
  </div>
);

export default BaseRouter;
