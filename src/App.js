import React, { Component } from "react";
import Movies from "./components/movie";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import "./App.css";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Navbar from "./components/navbar";
import LoginForm from "./components/loginForm";
import Logiout from "./components/logout";
import MovieFrom from "./components/movieForm";
import CustomerFrom from "./components/customerFrom";
import Return from "./components/returnfrom";
import RentFrom from "./components/rentFrom";
import MovieFromId from "./components/movieFromid";
import Register from "./components/register";
import "react-toastify/dist/ReactToastify.css";
class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
      console.log(this.state.user);
    } catch {}
  }
  render() {
    return (
      <div>
        <ToastContainer />
        <Navbar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/return" component={Return} />
            <Route path="/rental/new" component={RentFrom} />
            <Route path="/customer/new" component={CustomerFrom} />
            <Route path="/movies/new" component={MovieFrom} />
            <Route path="/movies/:id" component={MovieFromId} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logiout} />
            <Route path="/register" component={Register} />
            <Redirect from="/" to="/movies" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
