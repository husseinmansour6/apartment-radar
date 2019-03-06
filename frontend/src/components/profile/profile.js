import React, { Component } from "react"
import { connect } from "react-redux"
import "./profile.css"
class UnconnectedProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    console.log(this.props.resData)
    // let userName = resData.firstName + " " + resData.lastName
    return (
      <div>
        <div className="top">
          <div className="top-head">
            <div className="un">Welcome {username}</div>
            <div className="logout-div">
              <button onClick={this.handleLogOutSubmit}>Log Out</button>
            </div>
          </div>
          <div className="content-prof">
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

            {/* {this.getApartmentsForUser()}
            {console.log("in return: ", this.state.apartments)} */}
          </div>
        </div>
      </div>
    )
  }
}

let Profile = connect(st => {
  console.log("state in connect: ", st)
  return { resData: st.resData }
})(UnconnectedProfile)

export default Profile
