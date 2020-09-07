import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toastr from "toastr";

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: [
        { name: "India", value: "india" },
        { name: "UK", value: "uk" },
        { name: "USA", value: "usa" },
        { name: "Germany", value: "germany" },
        { name: "Canada", value: "canada" }
      ]
    };
  }
  signupValidationSchema = () => {
    return Yup.object().shape({
      userName: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      email: Yup.string()
        .email("Invalid email")
        .required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      country: Yup.string().required("Required")
    });
  };

  handleSubmit = values => {
    axios.post("http://localhost:5000/api/signup", values).then(response => {
      if (response.data.success) {
        this.props.history.push("/login");
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
          initialValues={{
            userName: "",
            password: "",
            email: "",
            firstName: "",
            lastName: "",
            gender: "",
            country: ""
          }}
          validationSchema={this.signupValidationSchema}
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
                <React.Fragment>
                  <Field type="text" placeholder="E-mail" name={`email`} />
                  <ErrorMessage name={`email`} />
                </React.Fragment>
                <React.Fragment>
                  <Field
                    type="text"
                    placeholder="First Name"
                    name={`firstName`}
                  />
                  <ErrorMessage name={`firstName`} />
                </React.Fragment>
                <React.Fragment>
                  <Field
                    type="text"
                    placeholder="Last Name"
                    name={`lastName`}
                  />
                  <ErrorMessage name={`lastName`} />
                </React.Fragment>
                <React.Fragment>
                  <Field as="select" name="country">
                    <option value="">Select</option>
                    {this.state.countryList.map((country, i) => (
                      <option key={i} value={country.value}>
                        {country.name}
                      </option>
                    ))}
                    ;
                  </Field>
                </React.Fragment>
                <React.Fragment>
                  <Field
                    name="gender"
                    render={({ field }) => (
                      <React.Fragment>
                        <div className="radio-item">
                          <input
                            {...field}
                            id="male"
                            value="male"
                            checked={field.value === "male"}
                            name="gender"
                            type="radio"
                          />
                          <label htmlFor="male">Male</label>
                        </div>

                        <div className="radio-item">
                          <input
                            {...field}
                            id="female"
                            value="female"
                            checked={field.value === "female"}
                            name="gender"
                            type="radio"
                          />
                          <label htmlFor="female">Female</label>
                        </div>
                      </React.Fragment>
                    )}
                  />
                  <ErrorMessage name={`gender`} />
                </React.Fragment>
                <button type="submit">Signup</button>
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

export default connect(mapStateToProps)(Signup);
