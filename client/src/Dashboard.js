import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

export class Dashboard extends Component {
  render() {
    return (
      <div>
        {!this.props.isAuthUser && <Redirect to="dashboard" />}
        <div>DashBoard</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthUser: state.userReducer.isAuthUser
  };
};

export default connect(mapStateToProps)(Dashboard);
