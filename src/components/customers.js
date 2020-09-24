import React, { Component } from "react";
import { getCustomer, deleteCustomer } from "../services/customerService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Customers extends Component {
  state = { customers: [] };
  async componentDidMount() {
    const { data: customers } = await getCustomer();
    this.setState({ customers });
    console.log(this.state.customers);
  }
  handleDelete = async (customer) => {
    const originalCustomer = this.state.customers;
    const customers = originalCustomer.filter((m) => m._id !== customer._id);
    this.setState({ customers: customers });
    try {
      await deleteCustomer(customer._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Customer is already deleted");
      this.setState({ customers: originalCustomer });
    }
  };
  render() {
    return (
      <div className="row">
        <div className="col-3 m-3">
          <Link
            to="customer/new"
            className="btn btn-primary"
            style={{ marginTop: 15 }}
          >
            New Customer
          </Link>
        </div>
        <div className="col">
          <h1>We have {this.state.customers.length} Customers</h1>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile No</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {this.state.customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer._id}</td>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(customer)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Customers;
