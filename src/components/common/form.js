import { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = { data: {}, error: {} };

  validate = () => {
    const { data } = this.state;
    const error = {};
    const result = Joi.validate(data, this.schema, { abortEarly: false });

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
  validateProperty = (input) => {
    const obj = { [input.name]: input.value };

    const schema = { [input.name]: this.schema[input.name] };
    const { error } = Joi.validate(obj, schema);
    if (!error) return null;
    else {
      return error.details[0].message;
    }
  };
  handleChange = (e) => {
    let error = { ...this.state.error };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) error[e.currentTarget.name] = errorMessage;
    else delete error[e.currentTarget.name];
    let data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, error });
  };
}

export default Form;
