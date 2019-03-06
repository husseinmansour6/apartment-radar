import React, { Component } from "react"
import { BrowserRouter, Link, Route } from "react-router-dom"
import "./login.css"
import { connect } from "react-redux"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      apartments: []
    }

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLogOutSubmit = this.handleLogOutSubmit.bind(this)
    this.getApartmentsForUser = this.getApartmentsForUser.bind(this)
    this.deleteApartment = this.deleteApartment.bind(this)
    this.preview = this.preview.bind(this)
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value })
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
    let b = {}
    b.email = this.state.email
    b.password = this.state.password
    console.log("b: ", b)
    fetch("http://localhost:4000/login", {
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
        if (!parsedResponse.success) alert("Wrong email or password!")

        this.props.dispatch({
          type: "set-sessionId",
          actionData: {
            sessionid: parsedResponse.sessionId,
            resultData: parsedResponse.result
          }
        })
      })
  }
  handleLogOutSubmit(event) {
    event.preventDefault()
    this.props.dispatch({
      type: "set-sessionId",
      actionData: {
        sessionid: "",
        resultData: ""
      }
    })
  }
  deleteApartment(event) {
    console.log("apt id: ", event.target.id)
    fetch("http://localhost:4000/deleteApartment", {
      method: "POST",
      body: JSON.stringify({ id: event.target.id })
    })
    this.getApartmentsForUser()
  }
  getApartmentsForUser() {
    let userId = this.props.resData._id
    console.log("userId: ", userId)
    console.log("userId parsed: ", JSON.stringify({ ownerId: userId }))

    fetch("http://localhost:4000/filterApartments", {
      method: "POST",
      body: JSON.stringify({ ownerId: userId })
    })
      .then(function(x) {
        console.log("im in then x")
        return x.text()
      })
      .then(x => {
        console.log(" im in then response")
        console.log("res: ", x)
        let parsedResponse = JSON.parse(x)

        if (this.state.apartments.length !== parsedResponse.length)
          this.setState({ apartments: parsedResponse })
        console.log("apartments: ", this.state.apartments)
      })
  }
  preview() {
    return this.state.apartments.map(apt => {
      console.log("apt in preview: ", apt)
      return (
        <tr>
          <td scope="row">{apt.address}</td>

          <td scope="row">
            <img
              className="deleteIcon"
              src="/images/delete.png"
              id={apt._id}
              onClick={this.deleteApartment}
            />
          </td>
        </tr>
      )
    })
  }

  render() {
    console.log("sid: ", this.props.sessionData)
    let resData = this.props.resData
    if (this.props.sessionData) {
      let userName = resData.firstName + " " + resData.lastName

      return (
        <div className="profile">
          <div className="display-flex">
            <div>
              <h1>Welcome {userName}</h1>
            </div>
            <div className="btnLeft">
              <button
                className="btn btn-primary"
                onClick={this.handleLogOutSubmit}
              >
                Log Out
              </button>
            </div>
          </div>

          <div>
            <p>
              <b>First name:</b> {resData.firstName}
            </p>
            <p>
              <b>Last name:</b> {resData.lastName}
            </p>
            <p>
              <b>Email:</b> {resData.email}
            </p>
            <p>
              <b>Phone number:</b> {resData.phoneNumber}
            </p>
          </div>
          {/* {console.log("hhhhh")} */}
          {this.getApartmentsForUser()}
          {/*{console.log("in return: ", this.state.apartments)} */}
          {console.log("console.log in render: ", this.state.apartments)}
          <div>
            <table id="data" className="table table-hover">
              <thead>
                <th scope="col">Address</th>

                <th scope="col">Actions</th>
              </thead>
              <tbody>{this.preview()}</tbody>
            </table>
          </div>
        </div>
      )
    } else
      return (
        <div className="login-box">
          <img className="avatar" src={"/images/avatar.png"} />
          <h1>Login Here</h1>
          <form onSubmit={this.handleSubmit}>
            <p>Email</p>
            <input
              type="text"
              placeholder="Enter Email"
              onChange={this.handleEmailChange}
            />
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={this.handlePasswordChange}
            />
            <input type="submit" value="Login" />
          </form>
        </div>
      )
  }
}

let Login = connect(st => {
  console.log("state in connect: ", st)
  return { sessionData: st.sid, resData: st.resData }
})(UnconnectedLogin)

export default Login
