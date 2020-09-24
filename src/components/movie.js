import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getJhonras } from "../services/jhonraService";
import Movie from "./common/movieTable";
import List from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    jhonras: [],
    pageL: 3,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };
  async componentDidMount() {
    const { data } = await getJhonras();
    let jhonras = [{ _id: "", name: "All Genras" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies: movies, jhonras });
  }

  handleDelete = async (movie) => {
    const originalMovie = this.state.movies;
    const movies = originalMovie.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("movie is already deleted");
      this.setState({ movies: originalMovie });
    }
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (number) => {
    this.setState({ currentPage: number });
  };
  handleList = (jhonra) => {
    this.setState({ selectedItem: jhonra, currentPage: 1 });
    //console.log(this.state.selectedItem.name);
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    if (this.state.movies.length === 0) return <p>No Movie On The List</p>;
    const { user } = this.props;
    const f =
      this.state.selectedItem && this.state.selectedItem._id
        ? this.state.movies.filter(
            (m) => m.jhonra.name === this.state.selectedItem.name
          )
        : this.state.movies;
    const sorted = _.orderBy(
      f,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const movies = paginate(sorted, this.state.currentPage, this.state.pageL);
    return (
      <div className="row">
        <div className="col-3">
          <List
            jhonras={this.state.jhonras}
            onList={this.handleList}
            selectItem={this.state.selectedItem}
          />
        </div>

        <div className="col">
          {user && (
            <Link
              to="movies/new"
              className="btn btn-primary"
              style={{ marginTop: 15 }}
            >
              New Movie
            </Link>
          )}

          <p className="m-3">Showing {f.length} in The Database</p>
          <Movie
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />

          <Pagination
            itemLength={f.length}
            pageLength={this.state.pageL}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
