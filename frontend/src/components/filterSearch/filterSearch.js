import React, { Component } from "react"
import "./filter.css"
import ViewApartment from "../viewApartments/viewApartments"

class FilterSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: "",
      filter: {}
    }
    this.handleRentalTypeChange = this.handleRentalTypeChange.bind(this)
    this.handleChangeParking = this.handleChangeParking.bind(this)
    this.handleChangeBedrooms = this.handleChangeBedrooms.bind(this)
    this.handleChangeAptrooms = this.handleChangeAptrooms.bind(this)
    this.renderApartments = this.renderApartments.bind(this)
    this.getData = this.getData.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.handleChangePrice = this.handleChangePrice.bind(this)
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
    if (apartments === "") this.componentDidMount()
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
  getData() {
    console.log("search by: ", this.state.filter)
    fetch("http://localhost:4000/filterApartments", {
      method: "POST",
      body: JSON.stringify(this.state.filter)
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
        this.setState({ items: parsedResponse })
        console.log("state: ", this.state.items)
      })
  }
  resetFilter() {
    this.setState({ filter: "" })
    this.componentDidMount()
  }

  handleRentalTypeChange(event) {
    this.setState({
      filter: { ...this.state.filter, rentalType: event.target.value }
    })
  }
  handleChangeParking(event) {
    this.setState({
      filter: { ...this.state.filter, parking: event.target.value }
    })
  }
  handleChangeBedrooms(event) {
    this.setState({
      filter: { ...this.state.filter, bedrooms: event.target.value }
    })
  }
  handleChangePrice(event) {
    this.setState({
      price: event.target.value,
      filter: { ...this.state.filter, price: event.target.value }
    })
  }
  handleChangeAptrooms(event) {
    this.setState({
      filter: { ...this.state.filter, apartmentRooms: event.target.value }
    })
  }
  render() {
    console.log("state filter: ", this.state.filter)
    return (
      <div>
        <div className="filterBar">
          <div className="margin">
            <select
              className="form-control"
              onChange={this.handleRentalTypeChange}
            >
              <option value="">Choose Rental Type..</option>
              <option value="Apartment/Condo">Apartment/Condo</option>
              <option value="House">House</option>
              <option value="Room Only">Room Only</option>
              <option value="Town House">Town House</option>
            </select>
          </div>
          <div className="margin">
            <select
              className="form-control"
              onChange={this.handleChangeParking}
            >
              <option value="">Choose Parking Type..</option>
              <option value="Garage parking">Garage parking</option>
              <option value="Street parking">Street parking</option>
              <option value="Off-street parking">Off-street parking</option>
              <option value="Parking available">Parking available</option>
              <option value="None">None</option>
            </select>
          </div>
          <div className="margin">
            <select
              className="form-control"
              onChange={this.handleChangeBedrooms}
              value={this.state.bedrooms}
            >
              <option value="">Number of bedrooms..</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="margin">
            <select
              className="form-control "
              onChange={this.handleChangeAptrooms}
            >
              <option value="">Number of Rooms..</option>
              <option value="1 1/2">1 1/2</option>
              <option value="2 1/2">2 1/2</option>
              <option value="3 1/2">3 1/2</option>
              <option value="4 1/2">4 1/2</option>
              <option value="5 1/2">5 1/2</option>
              <option value="6 1/2">6 1/2</option>
            </select>
          </div>
          <div className="filterBar">
            <div className="margin">
              <label>Price per month</label>
            </div>
            <div className="margin">
              <input
                type="range"
                className="custom-range"
                min="100"
                max="2000"
                onChange={this.handleChangePrice}
              />
            </div>
            <div className="margin">value: {this.state.price}</div>
          </div>
          <button onClick={this.getData} className="btn btn-primary margin">
            Filter
          </button>
          <button onClick={this.resetFilter} className="btn btn-primary margin">
            Reset
          </button>
        </div>
        <h1>{this.state.items.length} results found</h1>
        <div className="filterBar">{this.renderApartments()}</div>
      </div>
    )
  }
}

export default FilterSearch
