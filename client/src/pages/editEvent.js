import React from "react";
import API from "../utils/API";
import FullEvent from "../components/fullEvent";
import FooterComponent from "../components/footer";
import axios from "axios";
import { Jumbotron, Container, Row, Col, Button } from "react-bootstrap";
import { CreateBtn } from "../components/btn";
import LocationSearchInput from "../components/googleMapsSearchAutocomplete";
import { connect } from 'react-redux';
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';



const mapStateToProps = (state) => {
  return {
    id: state.authState.id,
    first_name: state.authState.first_name,
    last_name: state.authState.last_name,
    email: state.authState.email,
    token: state.authState.token,
  };
}

class EditEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      eventId: '',
      creator: '',
      description: '',
      date: '',
      location: '',
      streetAddress: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  async componentDidMount() {
    await this.setState({
      eventId: this.props.match.params.id,
      creator: this.props.id,
    })
    this.populateEvent();
  }

  populateEvent() {
    API.findEventById(this.state.eventId)
      .then(response => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          date: response.data.date,
          streetAddress: response.data.street_address,
        })
        console.log(response)
      }).catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.description) {
      API.updateEvent({
        id: this.state.eventId, // Event id
        title: this.state.title,
        description: this.state.description,
        date: this.state.date,
        // street_address: this.state.address,
        location: {
          type: 'Point',
          coordinates: [
            this.state.latLng.lng,
            this.state.latLng.lat
          ]
        }
      })
        .then(res => {
          this.props.history.push(`/events/${res.data._id}`);
        })
        .catch(err => console.log(err));
    }
    console.log(this.state);
    // };
    // onSubmit(e) {
    //   e.preventDefault();
    //  const newEvent = {
    //    creator: this.refs.creator.value,
    //    title: this.refs.title.value,
    //    description: this.refs.description.value,
    //    date: this.refs.date.value
    //  }
    //  this.editEvent(newEvent)
    //  e.preventDefault();
  }

  // handleInputChange(e){
  //   const target = e.target
  //   const value = target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value
  //   })
  // }

  handleLocationSearchChange = address => {
    this.setState({ address });
  };

  handleLocationSearchSelect = async address => {
    await this.setState({ address })
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(async latLng => {
        console.log(latLng)
        await this.setState({ latLng })
      })
      .catch(error => console.error('Error', error));
  };

  render() {

    return (

      <div>
        {'creator: ' + this.props.id}
        <Row>
          <Col>

          </Col>
          <Col xs={3}>

            <h1 style={{ marginTop: '2rem' }} >Edit Event</h1>
            <form style={{ marginRight: '2rem' }} onSubmit={this.handleFormSubmit}>



              <div className="input-field">
                <label style={{ marginLeft: '.5rem' }} htmlFor="name">Title</label>
                <input type="text" name="title" ref="title" value={this.state.title}
                  onChange={this.handleInputChange.bind(this)} />

              </div>

              <div className="input-field">
                <label style={{ marginLeft: '.5rem' }} htmlFor="name">Description</label>

                <input type="text" name="description" ref="description" value={this.state.description}
                  onChange={this.handleInputChange.bind(this)} />
              </div>

              <div className="input-field">
                <label style={{ marginLeft: '.5rem' }} htmlFor="name">Date</label>
                <input type="text" name="date" ref="date" value={this.state.date}
                  onChange={this.handleInputChange.bind(this)} />

              </div>

              <div className="input-field">
                <label style={{ marginLeft: '.5rem' }} htmlFor="name">Street address</label>
                <input type="text" name="streetAddress" ref="streetAddress" value={this.state.street_address}
                  onChange={this.handleInputChange.bind(this)} />
              </div>

              <div className="input-field">
                <label style={{ marginLeft: '.5rem' }} htmlFor="name">Location</label>
                <LocationSearchInput
                  value={this.state.address}
                  onChange={this.handleLocationSearchChange}
                  onSelect={this.handleLocationSearchSelect}
                />
              </div>
              <Button type="submit" value="Save" className="btn" variant="dark">Save</Button>
              {/* <input type="submit" value="Save" className="btn" /> */}
            </form>
          </Col>
          <Col>

          </Col>
        </Row>
      </div>


    )
  }
}



export default connect(mapStateToProps)(EditEvent);