import React, { Component } from "react";

class Input extends Component {
  state = {};
  render() {
    const { name, lebel, type, value, onChange, error } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{lebel}</label>
        <input
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          type={type}
          className="form-control"
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Input;
