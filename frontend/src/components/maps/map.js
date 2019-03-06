import ReactMapGL from "react-map-gl"
import React, { Component } from "react"
import { Marker } from "react-map-gl"
class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 45.5905196,
        longitude: -73.6448668,
        zoom: 14
      }
    }
  }

  render() {
    return (
      //   <ReactMapGL
      //     style={{ style: "mapbox://styles/mapbox/streets-v11" }}
      //     mapboxApiAccessToken={
      //       "pk.eyJ1IjoiaHVzc2Vpbm1hbnNvdXIiLCJhIjoiY2pza2p2MHNmMWw0NDQ5azZhdWVhbm16NiJ9.ST6j4GVh36r7u3jBFd88OA"
      //     }
      //     {...this.state.viewport}
      //     onViewportChange={viewport => this.setState({ viewport })}
      //   >
      //     <Marker
      //       latitude={45.5905196}
      //       longitude={-73.6448668}
      //       offsetLeft={-20}
      //       offsetTop={-10}
      //     />
      //   </ReactMapGL>
      <ReactMapGL
        latitude={45.5905196}
        longitude={-73.6448668}
        zoom={14}
        mapboxApiAccessToken={
          "pk.eyJ1IjoiaHVzc2Vpbm1hbnNvdXIiLCJhIjoiY2pza2p2MHNmMWw0NDQ5azZhdWVhbm16NiJ9.ST6j4GVh36r7u3jBFd88OA"
        }
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
      >
        <Marker
          latitude={45.5905196}
          longitude={-73.6448668}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div>You are here</div>
        </Marker>
      </ReactMapGL>
    )
  }
}

export default Map
