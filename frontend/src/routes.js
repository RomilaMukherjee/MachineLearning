import React from "react";
import { Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import D3Chart from "./containers/Chart/Chart";
import MapR from "./containers/MapR/MapR";

const BaseRouter = () => (
  <div>
    <Route exact path="/login/" component={Login} />
    <Route path="/chart/" component={D3Chart}/>
    <Route path="/map/" component={MapR}/>
  </div>
);

export default BaseRouter;
