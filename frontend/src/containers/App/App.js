import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "../../routes";
import "antd/dist/antd.css";
import * as actions from "../../store/actions/auth";
import CustomLayout from "../Layout";


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
    
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </Router>

    );
  }
}

const mapStateToProps = state => {
  return {
    //isAuthenticated: state.token !== null
    isAuthenticated:true
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
