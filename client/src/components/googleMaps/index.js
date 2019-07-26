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

        
class SimpleMap extends Component {
  static defaultProps = {
    center: { lat: 47.608987, lng: -122.335746, },
    zoom: 17
  };

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={47.608987}
          lng={-122.335746}
          text={'Seattle'}
        />
      </GoogleMapReact>
    );
  }
}

export default SimpleMap;