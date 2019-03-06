import React, { Component } from "react"
import "./addApp.css"
import { connect } from "react-redux"
import AddImages from "../addImages/addImages"
class UnconnectedAddApartment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      address: "",
      rentalType: "",
      apartmentRooms: "",
      bathrooms: "",
      bedrooms: "",
      laundryType: "",
      parking: "",
      animalFriendly: "",
      price: ""
    }
    this.handleChangeAddress = this.handleChangeAddress.bind(this)
    this.handleChangeRentalType = this.handleChangeRentalType.bind(this)
    this.handleChangeApartmentRooms = this.handleChangeApartmentRooms.bind(this)
    this.handleChangeBathrooms = this.handleChangeBathrooms.bind(this)
    this.handleChangeBedrooms = this.handleChangeBedrooms.bind(this)
    this.handleChangeLaundryType = this.handleChangeLaundryType.bind(this)
    this.handleChangeParking = this.handleChangeParking.bind(this)
    this.handleChangeAnimalFriendly = this.handleChangeAnimalFriendly.bind(this)
    this.handleChangePrice = this.handleChangePrice.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChangeAddress(event) {
    this.setState({ address: event.target.value })
  }
  handleChangeRentalType(event) {
    this.setState({ rentalType: event.target.value })
  }
  handleChangeApartmentRooms(event) {
    this.setState({ apartmentRooms: event.target.value })
  }
  handleChangeBathrooms(event) {
    this.setState({ bathrooms: event.target.value })
  }
  handleChangeBedrooms(event) {
    this.setState({ bedrooms: event.target.value })
  }
  handleChangeLaundryType(event) {
    this.setState({ laundryType: event.target.value })
  }
  handleChangeParking(event) {
    this.setState({ parking: event.target.value })
  }
  handleChangeAnimalFriendly(event) {
    this.setState({ animalFriendly: event.target.value })
  }
  handleChangePrice(event) {
    this.setState({ price: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
    console.log("props: ", this.props.resData)
    let checked = false
    if (this.state.animalFriendly === "on") checked = true
    let reqbody = {
      address: this.state.address,
      ownerId: this.props.resData._id,
      owner: this.props.resData.firstName + " " + this.props.resData.lastName,
      ownerId: this.props.resData._id,
      rentalType: this.state.rentalType,
      apartmentRooms: this.state.apartmentRooms,
      bathrooms: this.state.bathrooms,
      bedrooms: this.state.bedrooms,
      laundryType: this.state.laundryType,
      parking: this.state.parking,
      animalFriendly: checked,
      price: this.state.price
    }
    console.log("req body: ", reqbody)
    fetch("http://localhost:4000/addApartment", {
      method: "POST",
      body: JSON.stringify(reqbody)
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
        console.log("@@@@@ id: ", parsedResponse.resData._id)
        alert("One apartment has been added successfully!")
        this.props.history.push("/addImages/" + parsedResponse.resData._id)
      })
  }

  render() {
    if (this.props.sessionData) {
      console.log("props: ", this.props.resData)
      return (
        <div className="background" >
          <form onSubmit={this.handleSubmit}>
            <table className="table table-hover">
              <tbody>
                <tr>
                  <th scope="row">
                    <label>Address:</label>
                  </th>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the full address.."
                      onChange={this.handleChangeAddress}
                      value={this.state.address}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <label>Rental type:</label>
                  </th>
                  <td>
                    <select
                      className="form-control"
                      onChange={this.handleChangeRentalType}
                      value={this.state.rentalType}
                      required
                    >
                      <option value="" placeholder="" />
                      <option value="Apartment/Condo">Apartment/Condo</option>
                      <option value="House">House</option>
                      <option value="Room Only">Room Only</option>
                      <option value="Town House">Town House</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <label>Apartment Rooms:</label>
                  </th>
                  <td>
                    <select
                      className="form-control "
                      onChange={this.handleChangeApartmentRooms}
                    >
                      <option value="">choose one..</option>
                      <option value="1 1/2">1 1/2</option>
                      <option value="2 1/2">2 1/2</option>
                      <option value="3 1/2">3 1/2</option>
                      <option value="4 1/2">4 1/2</option>
                      <option value="5 1/2">5 1/2</option>
                      <option value="6 1/2">6 1/2</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <label>Bedrooms:</label>
                  </th>
                  <td>
                    <select
                      className="form-control"
                      onChange={this.handleChangeBedrooms}
                      value={this.state.bedrooms}
                    >
                      <option value="">choose one..</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <label>Bathrooms:</label>
                  </th>
                  <td>
                    <select
                      className="form-control"
                      onChange={this.handleChangeBathrooms}
                      value={this.state.bathrooms}
                    >
                      <option value="">choose one ..</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <label>Laundry Type:</label>
                  </th>
                  <td>
                    <select
                      className="form-control"
                      onChange={this.handleChangeLaundryType}
                      value={this.state.laundryType}
                    >
                      <option value="">choose one ..</option>
                      <option value="In-unit aundry">In-unit aundry</option>
                      <option value="Laundry in building">
                        Laundry in building
                      </option>
                      <option value="Laundry available">
                        Laundry available
                      </option>
                      <option value="None">None</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <label>Parking</label>
                  </th>
                  <td>
                    <select
                      className="form-control"
                      onChange={this.handleChangeParking}
                      value={this.state.parking}
                    >
                      <option value="">choose one ..</option>
                      <option value="Garage parking">Garage parking</option>
                      <option value="Street parking">Street parking</option>
                      <option value="Off-street parking">
                        Off-street parking
                      </option>
                      <option value="Parking available">
                        Parking available
                      </option>
                      <option value="None">None</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label>Animal friendly?</label>
                  </th>
                  <td>
                    <input
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                      onChange={this.handleChangeAnimalFriendly}
                      value={this.state.animalFriendly}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <label>Price per month:</label>
                  </th>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="price"
                      onChange={this.handleChangePrice}
                      value={this.state.price}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" align="center">
                    <input type="submit" className="btn btn-primary" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      )
    } else {
      return (
        <div className="msg">
          <div className="msg-text">you have to log in to add apartments!</div>
        </div>
      )
    }
  }
}

let AddApartment = connect(function(st) {
  console.log("state in connect: ", st)

  return { sessionData: st.sid, resData: st.resData }
})(UnconnectedAddApartment)

export default AddApartment
