import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
require('dotenv').config()

const mapContainerStyle = {
  position: 'relative',
  // left: '30vw',
  // bottom: '20vw'



}

const mapStyles = {
  // height: '100%',
  position: 'relative',
  // width: '100%',
  // left: '40vw',
  // bottom: '10vw'
  width: '40vw',
  height: '40vh',
  // marginLeft: 'auto',
  // marginRight: 'auto'
  // color: 'white',

  // background: 'grey',
  // padding: '15px 10px',
  // display: 'inline-flex',
  // textAlign: 'center',
  // alignItems: 'center',
  // justifyContent: 'center',
  // borderRadius: '100%',
  // transform: 'translate(50%, -50%)'
};

class MapContainer extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     stores: [{ lat: 47.49855629475769, lng: -122.14184416996333 },
  //     { latitude: 47.359423, longitude: -122.021071 },
  //     { latitude: 47.2052192687988, longitude: -121.988426208496 },
  //     { latitude: 47.6307081, longitude: -122.1434325 },
  //     { latitude: 47.3084488, longitude: -122.2140121 },
  //     { latitude: 47.5524695, longitude: -122.0425407 }]
  //   }
  // }

  displayMarkers = () => {
    // return this.state.stores.map((store, index) => {
    //   return <Marker key={index} id={index} position={{
    //     lat: store.latitude,
    //     lng: store.longitude
    //   }}
    //     onClick={() => console.log("You clicked me!")} />
    // })

    return <Marker
      key={this.props.key}
      id={this.props.key}
      position={{
        lat: this.props.latitude,
        lng: this.props.longitude
      }}
      onClick={() => console.log("You clicked me!")}
    />
  }

  render() {
    console.log({ lat: parseFloat(this.props.latitude), lng: parseFloat(this.props.longitude) })
    return (
      // <div className='mapContainer' style={mapContainerStyle}>
      
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{ lat: parseFloat(this.props.latitude), lng: parseFloat(this.props.longitude) }}
        >
          {this.displayMarkers()}
        </Map>

      // </div>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
})(MapContainer);