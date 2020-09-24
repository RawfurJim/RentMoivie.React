import React, { Component } from "react";
import Joi from "joi-browser";
import { saveUser } from "../services/userService";

class Register extends Component {
  state = {
    account: { email: "", password: "", name: "" },
    error: {},
  };
  schema = {
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(5).required(),
    name: Joi.string().min(3).required(),
  };
  validate = () => {
    const { account } = this.state;
    const error = {};
    const result = Joi.validate(account, this.schema, { abortEarly: false });

    if (!result.error) return null;

    for (let item of result.error.details) error[item.path[0]] = item.message;
    return error;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const error = this.validate();

    this.setState({ error: error || {} });
    if (error) {
      return;
    }
    this.doSubmit();
  };
  doSubmit = async () => {
    try {
      const response = await saveUser(this.state.account);
      console.log(response);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.email = ex.response.data;
        this.setState({ error });
      }
    }
  };
  handleChange = (e) => {
    let account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };
  render() {
    const { account, error } = this.state;
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={account.email}
              name="email"
              className="form-control"
              onChange={this.handleChange}
            />
            {error.email && (
              <div className="alert alert-danger">{error.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={account.password}
              name="password"
              className="form-control"
              onChange={this.handleChange}
            />
            {error.password && (
              <div className="alert alert-danger">{error.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={account.name}
              name="name"
              className="form-control"
              onChange={this.handleChange}
            />
            {error.name && (
              <div className="alert alert-danger">{error.name}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
