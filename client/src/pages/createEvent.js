import React from "react";
import API from "../utils/API";

import { Jumbotron, Container, Row, Col } from "react-bootstrap";
import { Input, FormBtn, TextArea } from "../components/Form";

import LocationSearchInput from '../components/googleMapsSearchAutocomplete'
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { connect } from 'react-redux';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import "../components/dateTime/index.css"

//Function to map our current state as props
const mapStateToProps = (state) => {
  return {
    id: state.authState.id,
    first_name: state.authState.first_name,
    last_name: state.authState.last_name,
    email: state.authState.email,
    token: state.authState.token,
  };
}

class CreateEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      eventId: '',
      creator: '',
      description: '',
      date: Date.now,
      latLng: {},
      streetAddress: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  //When page loads, creator is updated
  componentDidMount() {
    this.setState({ creator: this.props.id })
  }


handleInputChange = event => {
  const { name, value } = event.target;
  console.log(name, value);
  this.setState({
    [name]: value
  });
};



  //When user clicks submit, event is created in state and also created in DB
  handleFormSubmit = event => {
    event.preventDefault();
    if (
      this.state.title &&
      this.state.description &&
      this.state.address
      // && this.state.date // TODO FIX THIS
    ) {
      API.createEvent({
        title: this.state.title,
        description: this.state.description,
        creator: this.state.creator,
        date: this.state.date,
        street_address: this.state.address,
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
  };


  //Google Maps function for setting dynamic location 

  handleLocationSearchChange = address => {
    this.setState({ address });
  };

  handleLocationSearchSelect = async address => {
    await this.setState({ address })
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(async latLng => {
        await this.setState({ latLng })
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    return (

      <Container fluid>
        <Row>
          <Col size="sm-1" />
          <Col size="md-10">

            <Jumbotron style={{ textAlign: 'center', width: '40rem', marginTop: '3rem' }}>
              <h1>Create an Event</h1>
            </Jumbotron>
          </Col>
          <Col size="sm-1" />

        </Row>
        <Row style={{ marginBottom: '5rem' }}>
          <Col size="sm-1" />
          <Col size="md-5">
            <form>
              {/* Event title */}
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />

              {/* Event description */}
              <TextArea
                style={{ height: '300px' }}
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder=" Description (required)"
              />


              {/* Google Location autocomplete search */}
              <LocationSearchInput
                value={this.state.address}
                onChange={this.handleLocationSearchChange}
                onSelect={this.handleLocationSearchSelect}
              />
              <div>   <br></br>         </div>
              <FormBtn
                style={{ width: "10rem" }}
                disabled={!(this.state.description && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Create Event
              </FormBtn>
            </form>
          </Col>
        
          <div>
                {/* <label style={{ marginLeft: '.5rem' }} htmlFor="name">Date</label>
                <input type="text" name="date" ref="date" value={this.state.date}
                  onChange={this.handleInputChange.bind(this)} /> */}
                  <DateTimePickerComponent name="date" value={this.state.date} id="datetimepicker" placeholder="Select a date and time" onChange={this.handleInputChange}/>
              </div>
              {/* <Calendar startDate={new Date().getTime()} displayTime /> */}
        
          <Col size="sm-1" />

        </Row>
      </Container>
    );
  }
}


export default connect(mapStateToProps)(CreateEvent);