import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./viewApt.css"
import { connect } from "react-redux"
import Iframe from "react-iframe"
class ViewAptData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apartment: "",
      images: "",
      message: "",
      senderEmail: "",
      senderPassword: "",
      ownerEmail: ""
    }
    this.getPics = this.getPics.bind(this)
    this.renderImages = this.renderImages.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.getOwnerData = this.getOwnerData.bind(this)
    this.handleSenderEmailChange = this.handleSenderEmailChange.bind(this)
    this.handleSenderPasswordChange = this.handleSenderPasswordChange.bind(this)
  }

  componentDidMount() {
    let aptId = this.props.match.params
    console.log("aptId: ", aptId)
    console.log("aptId parsed: ", JSON.stringify(aptId))

    fetch("http://localhost:4000/viewApartmentData", {
      method: "POST",
      body: JSON.stringify(aptId)
    })
      .then(response => {
        console.log("response: ", response)
        return response.text()
      })
      .then(response => {
        let parsedResponse = JSON.parse(response)
        console.log("parsed: ", parsedResponse)

        this.setState({ apartment: parsedResponse[0] })
      })
  }

  handleMessageChange(event) {
    this.setState({ message: event.target.value })
  }
  handleSenderEmailChange(event) {
    this.setState({ senderEmail: event.target.value })
  }
  handleSenderPasswordChange(event) {
    this.setState({ senderPassword: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()

    let sendBody = {
      message: this.state.message,
      senderEmail: this.state.senderEmail,
      senderPassword: this.state.senderPassword,
      apartmenAddress: this.state.apartment.address,
      ownerEmail: this.state.ownerEmail
    }
    console.log("sendbody: ", sendBody)
    fetch("http://localhost:4000/send", {
      method: "POST",
      body: JSON.stringify(sendBody)
    })
      .then(response => {
        console.log("response send: ", response)
        return response.text()
      })
      .then(response => {
        console.log("send message res: ", response)
        let parsedRes = JSON.parse(response)
        console.log("parsed in send: ", parsedRes.success)
        if (parsedRes.success) {
          alert("mail sent successfully!")
        } else {
          alert("failed to send email!")
        }

        this.setState({ message: "" })
      })
  }

  getPics() {
    let aptId = this.props.match.params
    if (this.state.images.length === 0) {
      fetch("http://localhost:4000/getPics", {
        method: "POST",
        body: JSON.stringify(aptId.id)
      })
        .then(response => {
          return response.text()
        })
        .then(response => {
          let parsedResponse = JSON.parse(response)
          console.log("parsed: ", parsedResponse)
          this.setState({ images: parsedResponse[0].paths })
        })
    }
  }
  renderImages() {
    let images = this.state.images
    let path = +images

    console.log("path: ", path)
    if (images.length !== 0) {
      return images.map(img => {
        console.log("img in renderImg: ", img)
        return (
          <div className="img-div">
            <img
              className="gallery-image"
              src={"http://" + window.location.hostname + ":4000" + img}
            />
          </div>
        )
      })
    }
  }

  getOwnerData() {
    let ownerId = this.state.apartment.ownerId
    console.log("owner id: ", ownerId)
    fetch("http://localhost:4000/getOwnerId", {
      method: "POST",
      body: JSON.stringify(ownerId)
    })
      .then(response => {
        return response.text()
      })
      .then(response => {
        let parsedResponse = JSON.parse(response)
        console.log("parsed: ", parsedResponse.result[0].email)
        if (!this.state.ownerEmail)
          this.setState({ ownerEmail: parsedResponse.result[0].email })
      })
  }

  render() {
    this.getPics()

    if (this.state.apartment) {
      this.getOwnerData()
    }
    console.log("state in render apt: ", this.state.apartment)
    console.log("state  images: in render apt: ", this.state.images)
    // const myApi = "AIzaSyA-jchsT8QFgRFD8F3qx2A9YxHovAVEOvA"
    // let url = `https://www.google.com/maps/embed/v1/place?key=${myApi}&q=40.7127837,-74.0059413`
    return (
      <div className="">
        <div className="gallery">{this.renderImages()}</div>
        <div className="flex-div">
          <div className="first">
            <p>
              <b>Address:</b> {this.state.apartment.address}
            </p>
            <p>
              <b>Owner:</b>
              {this.state.apartment.owner}
            </p>
            <p>
              <b>Rental type:</b> {this.state.apartment.rentalType}
            </p>
            <p>
              <b>Number of rooms:</b> {this.state.apartment.apartmentRooms}
            </p>
            <p>
              <b>Number of bedrooms:</b> {this.state.apartment.bedrooms}
            </p>
          </div>
          <div className="second">
            <p>
              <b>Number of bathrooms:</b> {this.state.apartment.bathrooms}
            </p>
            <p>
              <b>Laundry type:</b> {this.state.apartment.laundryType}
            </p>
            <p>
              <b>Parking type:</b> {this.state.apartment.parking}
            </p>

            <p>
              <b>Price per month:</b> {this.state.apartment.price}
            </p>
          </div>
          <div className="message-div">
            <h3>More information? send him a message..</h3>
            <form onSubmit={this.handleSubmit}>
              <table>
                <tr>
                  <td>
                    <input
                      // className="login-box input[type='text']"
                      type="text"
                      onChange={this.handleSenderEmailChange}
                      placeholder="Gmail account here.."
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      className="gmail"
                      type="password"
                      onChange={this.handleSenderPasswordChange}
                      placeholder="Gmail password here.."
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <textarea
                      rows="4"
                      cols="40"
                      onChange={this.handleMessageChange}
                      placeholder="Enter your message here .."
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      className="button-style"
                      type="submit"
                      value="Send"
                    />
                  </td>
                </tr>
              </table>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default ViewAptData
