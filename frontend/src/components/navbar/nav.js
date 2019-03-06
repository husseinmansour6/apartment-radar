import React, { Component } from "react"
import "./nav.css"
import { Link } from "react-router-dom"

class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <ul className="nav-body">
          <li className="nav-bar">
            <Link className="navlink " to="/">
              Home
            </Link>
          </li>

          <li className="nav-bar">
            <Link className="navlink" to="/signup">
              Sign Up
            </Link>
          </li>
          <li className="nav-bar">
            <Link className="navlink" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-bar">
            <Link className="navlink" to="/addApartment">
              Add Apartment
            </Link>
          </li>

          <li className="nav-bar">
            <Link className="navlink" to="/filter">
              Filter
            </Link>
          </li>
          
        </ul>
      </nav>
    )
  }
}

export default Nav
