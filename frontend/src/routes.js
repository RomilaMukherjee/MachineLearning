import React from "react";
import { Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import D3Chart from "./containers/Chart/Chart";

const BaseRouter = () => (
  <div>
    <Route exact path="/login/" component={Login} />
    <Route path="/chart/" component={D3Chart}/>
  </div>
);

export default BaseRouter;
