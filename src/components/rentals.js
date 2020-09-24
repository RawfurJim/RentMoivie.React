import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getRentals } from "../services/rentalService";

class Rentals extends Component {
  state = { rentals: [] };
  async componentDidMount() {
    const { data: rentals } = await getRentals();
    this.setState({ rentals });
    console.log(this.state.rentals);
  }
  render() {
    return (
      <div className="row">
        <div className="col-3 m-3">
          <Link
            to="rental/new"
            className="btn btn-primary"
            style={{ marginTop: 15 }}
          >
            Rent New Movie
          </Link>
        </div>
        <div className="col">
          <h1>We have {this.state.rentals.length} rentals</h1>
        </div>
        <div className="col-3 m-3">
          <Link
            to="return"
            className="btn btn-primary"
            style={{ marginTop: 15 }}
          >
            Return Movie
          </Link>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Mobile No</th>
              <th>Movie Name</th>
              <th>Daily Rate</th>
              <th>Date Out</th>
              <th>Date Return </th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rentals.map((rental) => (
              <tr key={rental._id}>
                <td>{rental.customer.name}</td>
                <td>{rental.customer.phone}</td>
                <td>{rental.movie.title}</td>
                <td>{rental.movie.dailyRentalRate}</td>
                <td>{rental.dateOut}</td>
                <td>{rental.dateReturn}</td>
                <td>{rental.rentalFee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Rentals;
