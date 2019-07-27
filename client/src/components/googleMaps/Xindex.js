import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white',
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);


// class SimpleMap extends Component {

//   state = {
//     zoom: 17
//   };

//   render() {
//     console.log({lat: parseFloat(this.props.latitude), lng: parseFloat(this.props.longitude)})
//     return (
//       <React.Fragment>
//         <GoogleMapReact
//           defaultCenter={ {lat: parseFloat(this.props.latitude), lng: parseFloat(this.props.longitude)}}
//           defaultZoom={this.props.zoom}
//         >
//           {/* <AnyReactComponent
//             lat={this.props.latitude}
//             lng={this.props.longitude}
//             text={'Location'}
//           /> */}
//         </GoogleMapReact>
//       </React.Fragment>

//     );
//   }
// }

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59,
      lng: 30
    },
    zoom: 11
  };

  // componentDidMount() {
  //   this.setState({lat: parseFloat(this.props.latitude), lng: parseFloat(this.props.longitude)})

  // }
 
  render() {
    console.log({lat: parseFloat(this.props.latitude), lng: parseFloat(this.props.longitude)})
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          // defaultCenter={{lat: parseFloat(this.props.latitude), lng: parseFloat(this.props.longitude)}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {/* <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          /> */}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;