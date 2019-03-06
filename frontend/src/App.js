import React, { Component } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import Login from "./components/login/login"
import Home from "./components/home/home"
import Nav from "./components/navbar/nav"
import SignUp from "./components/signup/signup"
import AddApartment from "./components/addApartment/addApartment"
import "./main.css"
import ViewAptData from "./components/viewAptData/viewAptData"
import Map from "./components/maps/map"
import FilterSearch from "./components/filterSearch/filterSearch"
import AddImages from "./components/addImages/addImages"
let reducer = function(state, action) {
  console.log("state: ", state)
  if (action.type === "set-sessionId") {
    console.log("action: ", action)
    return {
      ...state,
      sid: action.actionData.sessionid,
      resData: action.actionData.resultData
    }
  }
  console.log("state again: ", state)
  return state // Needed because react-redux calls your reducer with an @@init action
}

let myStore = createStore(
  reducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class App extends Component {
  render() {
    return (
      <Provider store={myStore}>
        <BrowserRouter>
          <div>
            <div className="header">
              <img src="/images/logo.png" className="logo" />
              <h1>
                <span className="firstWord">Apartment</span>
                <span className="secondWord">Radar</span>
              </h1>
              <Nav />
            </div>
            <div className="content">
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/addApartment" component={AddApartment} />
              <Route exact path="/viewAptData/:id" component={ViewAptData} />
              <Route exact path="/filter" component={FilterSearch} />
              <Route exact path="/addImages/:id" component={AddImages} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
