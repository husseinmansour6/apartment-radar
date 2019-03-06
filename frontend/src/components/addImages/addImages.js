import React, { Component } from "react"
import "./addImages.css"

class AddImages extends Component {
  constructor(props) {
    super(props)
    this.fileChangeHandler = this.fileChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    // this.preview = this.preview.bind(this)
    this.state = {
      selectedFile: undefined, // The file that the user will selected
      items: []
    }
  }
  fileChangeHandler(event) {
    // Store the file in the state so that you can use it in the submit
    this.setState({ selectedFiles: event.target.files })
  }

  submitHandler(event) {
    event.preventDefault()

    let formData = new FormData()

    for (let i = 0; i < this.state.selectedFiles.length; i++) {
      let file = this.state.selectedFiles[i]
      formData.append("imgs[]", file, file.name)
    }

    // The description will be in the req.body of the backend
    console.log("iiiiiiiii: ", this.props.match.params)
    formData.append("apartmentId", this.props.match.params.id)

    fetch("http://localhost:4000/addImages", {
      body: formData,
      method: "POST"
    })
      .then(responseHeader => {
        return responseHeader.text()
      })
      .then(responseBody => {
        let parsed = JSON.parse(responseBody)
        this.setState({ items: parsed })
      })
  }
  render() {
    console.log("id: ", this.props.match.params)
    return (
      <div className="addImagesPage" align="center">
        <h1>Add maximum 3 images for your apartment</h1>
        <form onSubmit={this.submitHandler}>
          <input type="file" onChange={this.fileChangeHandler} multiple />
          <input type="submit" />
        </form>
        <div className="img-flex">
          {this.state.items.map(item => {
            console.log("item data", item)
            // window.location.hostname is the domain (or IP) from where the webpage was downloaded
            let imagePath =
              "http://" + window.location.hostname + ":4000" + item
            console.log("image path", imagePath)
            return (
              <div>
                <div>
                  <img src={imagePath} className="prevImg" />
                  {item.description}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default AddImages
