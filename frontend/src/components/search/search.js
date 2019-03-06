import React, { Component } from "react"
import "./search.css"
import ViewAptData from "../viewApartments/viewApartments"
class SearchByName extends Component {
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
    return apartments.map(apt => {
      console.log("apt: ", apt)
      return (
        <ViewAptData
          id={apt._id}
          apartmentRooms={apt.apartmentRooms}
          price={apt.price}
          address={apt.address}
        />
      )
    })
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
      <div className="main">
        <form>
          <input
            type="text"
            onChange={this.handleSearchChange}
            placeholder="type to search"
          />
        </form>
        <div className="flex">{this.renderApartments()}</div>
      </div>
    )
  }
}

export default SearchByName
