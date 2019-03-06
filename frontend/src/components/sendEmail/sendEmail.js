import React, { Component } from "react"
import { connect } from "react-redux"

class SendEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      name: "",
      message: ""
    }

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value })
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value })
  }
  handleMessageChange(event) {
    this.setState({ message: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
    let sendBody = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
     
    }
    console.log("sendbody: ", sendBody)
    fetch("http://localhost:4000/send", {
      method: "POST",
      body: JSON.stringify(sendBody)
    })
  }

  render() {
    return (
      <div className="">
        <form onSubmit={this.handleSubmit}>
          <p>Name</p>
          <input
            type="text"
            placeholder="Enter name"
            onChange={this.handleNameChange}
          />
          <p>Email</p>
          <input
            type="text"
            placeholder="Enter Email"
            onChange={this.handleEmailChange}
          />
          <p>Message</p>
          
          <textarea rows="4" cols="50" onChange={this.handleMessageChange}>
            Enter text here...
          </textarea>

          <input type="submit" value="Send" />
        </form>
      </div>
    )
  }
}

// let Login = connect(st => {
//   console.log("state in connect: ", st)
//   return { sessionData: st.sid, resData: st.resData }
// })(UnconnectedLogin)

export default SendEmail
