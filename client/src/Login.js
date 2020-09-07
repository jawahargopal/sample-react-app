import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toastr from "toastr";

import { loginUser } from "./redux/user/user.actions";

export class Login extends Component {
  loginValidationSchema = () => {
    return Yup.object().shape({
      userName: Yup.string().required("Required"),
      password: Yup.string().required("Required")
    });
  };

  handleSubmit = values => {
    axios.post("http://localhost:5000/api/login", values).then(response => {
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        this.props.loginUser(response.data.data);
        toastr.success(response.data.msg);
      } else {
        toastr.error(response.data.msg);
      }
    });
  };

  render() {
    return (
      <div>
        {this.props.isAuthUser && <Redirect to="dashboard" />}
        <Formik
          initialValues={{ userName: "", password: "" }}
          validationSchema={this.loginValidationSchema}
          onSubmit={this.handleSubmit}
        >
          {props => (
            <Form>
              <div className="container">
                <React.Fragment>
                  <Field
                    type="text"
                    placeholder="User Name"
                    name={`userName`}
                  />
                  <ErrorMessage name={`userName`} />
                </React.Fragment>
                <React.Fragment>
                  <Field
                    type="password"
                    placeholder="Password"
                    name={`password`}
                  />
                  <ErrorMessage name={`password`} />
                </React.Fragment>
                <button type="submit">Login</button>
              </div>
            </Form>
          )}
        </Formik>
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
    loginUser
  }
)(Login);
