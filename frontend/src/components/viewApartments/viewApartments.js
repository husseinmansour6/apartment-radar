import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./viewApartment.css"
class ViewApartment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: ""
    }
    // this.getImages = this.getImages.bind(this)
  }

  componentDidMount() {
    let aptId = this.props.id
    console.log("ID: ", aptId)
    if (this.state.images.length === 0) {
      fetch("http://localhost:4000/getPics", {
        method: "POST",
        body: JSON.stringify(aptId)
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

  render() {
    // this.getImages()
    console.log("state in render @@@@@@: ", this.state.images)
    let max = this.state.images.length
    console.log("max: ", max)
    let images = this.state.images
    let rand = Math.floor(Math.random() * max)
    console.log("rand: ", rand)
    let path = "http://" + window.location.hostname + ":4000" + images[rand]

    console.log("path: ", path)

    return (
      <div className="mainDiv">
        <div className="card border-primary mb-3">
          <div className="card-header">{this.props.rentalType}</div>
          <div className="card-body-image">
            <p className="bottom-left">${this.props.price}</p>
            <Link to={"/viewAptData/" + this.props.id}>
              <img className="itemImg" src={path} />
            </Link>
          </div>
          <div className="card-body">
            <div className="card-text">Address: {this.props.address}</div>
          </div>
        </div>
      
      </div>
    )
  }
}

export default ViewApartment
