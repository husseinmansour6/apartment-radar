import React, { Component } from "react"
import { BrowserRouter, Link, Route } from "react-router-dom"
import "./signup.css"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
class UnconnectedSignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      sessionId: ""
    }

    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
  }
  handlePhoneNumberChange(event) {
    this.setState({ phoneNumber: event.target.value })
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value })
  }
  handleFirstNameChange(event) {
    this.setState({ firstName: event.target.value })
  }
  handleLastNameChange(event) {
    this.setState({ lastName: event.target.value })
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
    let b = {}
    b.phoneNumber = this.state.phoneNumber
    b.password = this.state.password
    b.firstName = this.state.firstName
    b.lastName = this.state.lastName
    b.email = this.state.email
    console.log("b: ", b)
    fetch("http://localhost:4000/signup", {
      method: "POST",
      body: JSON.stringify(b)
    })
      .then(function(x) {
        console.log("im in then x")
        return x.text()
      })
      .then(x => {
        console.log(" im in then response")
        console.log("res: ", x)
        let parsedResponse = JSON.parse(x)
        console.log(parsedResponse)
        if (!parsedResponse.success)
          alert("the email is already exists! try another one")

        this.props.dispatch({
          type: "set-sessionId",
          actionData: {
            sessionid: parsedResponse.sessionId,
            resultData: parsedResponse.result
          }
        })
      })
  }
  render() {
    console.log("sid: ", this.props.sessionData)
    if (this.props.sessionData) {
      return <Redirect to="/login" />
    } else
      return (
        <div className="signup-box">
          <img className="avatar" src={"/images/avatar.png"} />
          <h1>Create your account</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              <b>First Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              onChange={this.handleFirstNameChange}
              required
            />
            <label>
              <b>Last Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              onChange={this.handleLastNameChange}
              required
            />
            <label>
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter a valid gmail account"
              onChange={this.handleEmailChange}
              required
            />
            <label>
              <b>Phone Number</b>
            </label>
            <input
              type="text"
              placeholder="Enter Phone number"
              onChange={this.handlePhoneNumberChange}
              required
            />
            <label>
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter your gmail password"
              onChange={this.handlePasswordChange}
              required
            />

            <input type="submit" value="Login" />
          </form>
        </div>
      )
  }
}

let SignUp = connect(function(st) {
  console.log("state in connect: ", st)
  return { sessionData: st.sid, resData: st.resData }
})(UnconnectedSignUp)

export default SignUp
