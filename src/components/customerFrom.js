import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

import { saveCustomer } from "../services/customerService";

class MovieFrom extends Component {
  state = {
    account: {
      name: "",
      phone: "",
    },
    error: {},
  };
  schema = {
    name: Joi.string().required().label("Name"),
    phone: Joi.string().required().label("Phone"),
  };

  validate = () => {
    const { account } = this.state;
    const error = {};
    const result = Joi.validate(account, this.schema, { abortEarly: false });

    if (!result.error) return null;

    for (let item of result.error.details) error[item.path[0]] = item.message;
    return error;
  };
  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
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
    await saveCustomer(this.state.account);

    this.props.history.push("/customers");
  };
  render() {
    const { account, error } = this.state;
    return (
      <div>
        <Input
          name="name"
          value={account.name}
          lebel="Name"
          onChange={this.handleChange}
          error={error.name}
        />
        <Input
          name="phone"
          value={account.phone}
          lebel="Phone"
          onChange={this.handleChange}
          error={error.phone}
        />

        <button
          type="submit"
          onClick={this.handleSubmit}
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
    );
  }
}

export default MovieFrom;
