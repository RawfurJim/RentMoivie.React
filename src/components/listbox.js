import React, { Component } from "react";

class ListBox extends Component {
  render() {
    const { name, lebel, options, error, onSelect } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}> {lebel} </label>
        {
          <select
            id={name}
            name={name}
            onChange={onSelect}
            className="form-control"
          >
            <option value="" />
            {options.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        }
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default ListBox;
