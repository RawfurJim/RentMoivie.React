import React from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";
import { Login } from "../services/loginService";
class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    error: {},
  };
  schema = {
    email: Joi.string().min(3).max(30).required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data: jwt } = await Login(this.state.data);

      console.log(jwt);
      localStorage.setItem("token", jwt);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.email = ex.response.data;
        error.password = ex.response.data;
        this.setState({ error });
      }
    }
  };

  render() {
    const { data, error } = this.state;
    return (
      <div>
        <h1>login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="email"
            value={data.email}
            type="text"
            lebel="Email"
            error={error.email}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            type="password"
            value={data.password}
            lebel="Password"
            error={error.password}
            onChange={this.handleChange}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
