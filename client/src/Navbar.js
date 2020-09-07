import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import toastr from "toastr";

import { logoutUser } from "./redux/user/user.actions";

class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
    toastr.success("You have successfully logged out!");
  };
  render() {
    return (
      <div className="topnav">
        {!this.props.isAuthUser ? (
          <React.Fragment>
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
            <NavLink to="/signup" activeClassName="active">
              Signup
            </NavLink>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavLink to="/dashboard" activeClassName="active">
              Dashboard
            </NavLink>
            <a href="javascript:void(0)" onClick={this.handleLogout}>
              Logout
            </a>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthUser: state.userReducer.isAuthUser
  };
};

export default connect(
  mapStateToProps,
  {
    logoutUser
  }
)(Navbar);
