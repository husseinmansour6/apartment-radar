import React, { Component } from "react"
import { render } from "react-dom"

// import Login from "./login"
import "./home.css"
import { BrowserRouter, Route } from "react-router-dom"
import Login from "../login/login"
// import ViewAptData from "./components/viewAptData/viewAptData";
import ViewApartment from "../viewApartments/viewApartments"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
      items: []
    }

    this.renderApartments = this.renderApartments.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  componentDidMount() {
    fetch("http://localhost:4000/viewApartments")
      .then(response => {
        return response.text()
      })
      .then(response => {
        let parsedResponse = JSON.parse(response)
        console.log("parsed: ", parsedResponse)
        this.setState({ items: parsedResponse.items })
      })
  }
  renderApartments() {
    let apartments = this.state.items
    console.log("apartments: ", apartments)

    if (apartments.length === 0) this.componentDidMount()
    else {
      console.log("apartments: ", apartments)
      return apartments.map(apt => {
        console.log("apt: ", apt)
        return (
          <ViewApartment
            id={apt._id}
            apartmentRooms={apt.apartmentRooms}
            price={apt.price}
            address={apt.address}
            rentalType={apt.rentalType}
          />
        )
      })
    }
  }

  handleSearchChange(event) {
    this.getData(event.target.value)
  }

  getData(string) {
    console.log("search by: ", string)
    fetch("http://localhost:4000/searchByName", {
      method: "POST",
      body: JSON.stringify(string)
    })
      .then(function(x) {
        console.log("im in then x")

        return x.text()
      })
      .then(x => {
        console.log(" im in then response")
        console.log("res: ", x)

        let parsedResponse = JSON.parse(x)
        console.log("parsed in getData: ", parsedResponse)
        this.setState({ items: parsedResponse.apartments })
        console.log("state: ", this.state.items)
      })
  }

  render() {
    return (
      <div>
        <div className="search">
          <div className="search-content">
            <h2 className="search-content-title">
              Looking for apartment to rent? <br />
              check what we have for you
            </h2>
            <input
              type="text"
              className="form-control searchbox"
              placeholder="Search by city .."
              onChange={this.handleSearchChange}
            />
          </div>
        </div>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            />
            <li data-target="#carouselExampleIndicators" data-slide-to="1" />
            <li data-target="#carouselExampleIndicators" data-slide-to="2" />
            <li data-target="#carouselExampleIndicators" data-slide-to="3" />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src="/images/3.jpg" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="/images/1.jpg" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="/images/2.jpg" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="/images/4.jpg" />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>

        <div className="flex">{this.renderApartments()}</div>
      </div>
    )
  }
}

export default Home
