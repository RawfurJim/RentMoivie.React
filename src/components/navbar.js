import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/movies">
                Movie
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink className="nav-link" to="/customers">
                Customers
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink className="nav-link" to="/rentals">
                Rentals
              </NavLink>
            </li>
            {!user && (
              <React.Fragment>
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/profile">
                    {user.name}
                  </NavLink>
                </li>
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
