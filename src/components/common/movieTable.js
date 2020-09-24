import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./like";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

class Movie extends Component {
  columns = [
    { path: "_id", lebel: "Id" },
    {
      path: "title",
      lebel: "Title",
      content: (movie) => <Link to={`movies/${movie._id}`}>{movie.title}</Link>,
    },
    { path: "jhonra.name", lebel: "Genra" },
    { path: "numberInstock", lebel: "Stock" },
    { path: "dailyRentalRate", lebel: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onLike={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={movies} columns={this.columns} />
      </table>
    );
  }
}
export default Movie;
