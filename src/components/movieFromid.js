import React, { Component } from "react";
import Input from "./common/input";
import ListBox from "./listbox";
import Joi from "joi-browser";
import { editMovie, getMoviesById } from "../services/movieService";
import { getJhonras } from "../services/jhonraService";

class MovieFromId extends Component {
  state = {
    jhonras: [],
    account: {
      title: "",
      jhonraId: "",
      numberInstock: "",
      dailyRentalRate: "",
    },
    movie: [],
    error: {},
  };
  schema = {
    title: Joi.string().required().label("Title"),
    jhonraId: Joi.string().label("Genre"),
    numberInstock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    dailyRentalRate: Joi.number().required().min(1).max(10),
  };
  async populateJhonras() {
    const { data: jhonras } = await getJhonras();
    this.setState({ jhonras });
  }
  async populateMovie() {
    const { data: movie } = await getMoviesById(this.props.match.params.id);
    this.setState({ movie });
    const { account } = this.state;
    account.title = this.state.movie.title;
    console.log(account.title);
  }

  async componentDidMount() {
    await this.populateJhonras();
    await this.populateMovie();
  }
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
    const id = this.props.match.params.id;
    await editMovie(id, this.state.account);

    this.props.history.push("/movies");
  };
  render() {
    const { account, error } = this.state;
    return (
      <div>
        <Input
          name="title"
          value={account.title}
          lebel="Title"
          onChange={this.handleChange}
          error={error.name}
        />

        <ListBox
          name="jhonraId"
          onSelect={this.handleChange}
          lebel="Genra"
          options={this.state.jhonras}
          error={error.jhonraId}
        />
        <Input
          name="numberInstock"
          value={account.numberInstock}
          lebel="Stock"
          onChange={this.handleChange}
          error={error.numberInstock}
        />
        <Input
          name="dailyRentalRate"
          value={account.dailyRentalRate}
          lebel="Rental Rate"
          onChange={this.handleChange}
          error={error.dailyRentalRate}
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

export default MovieFromId;
