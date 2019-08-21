import React from "react";

import { Jumbotron, Container, Row, Col, Card } from "react-bootstrap";

import LocationSearchInput from '../components/googleMapsSearchAutocomplete'
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';

import { connect } from 'react-redux';

import API from "../utils/API";
import { Input, FormBtn, TextArea } from "../components/Form";
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

  state = {
    eventId: '',
    creator: '',
    description: '',
    date: Date.now,
    latLng: {},
    streetAddress: '',
  }

  //When page loads, creator is updated
  componentDidMount() {
    this.setState({ creator: this.props.id })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
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
      this.state.address &&
      this.state.date
    ) {
      API.createEvent(
        {
          title: this.state.title,
          description: this.state.description,
          date: this.state.date,
          street_address: this.state.address,
          location: {
            type: 'Point',
            coordinates: [
              this.state.latLng.lng,
              this.state.latLng.lat
            ]
          }
        }
      )
        .then(res => {
          this.props.history.push(`/events/${res.data._id}`);

        })
        .catch(err => console.log(err.response));
    }
  };

  //Google Maps function for searching location 
  handleLocationSearchChange = address => {
    this.setState({ address });
  };

  //Google Maps function for setting dynamic location 
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
        <Row id="createEventRow">
          {/* <Col size="sm-1" /> */}
          <Col id="createEventCol" size="md-10">
          <Card>
            <Card.Header id="createHeader">
              <h1 id="text">Create an Event</h1>
            </Card.Header>
            <Card.Body>
              
              <Row style={{ marginBottom: '1rem' }}>
                {/* <Col size="sm-1" /> */}
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
                      id="locationField"
                      style="width: 100%;"
                      value={this.state.address}
                      onChange={this.handleLocationSearchChange}
                      onSelect={this.handleLocationSearchSelect}
                    />
                    <br></br>
                    <div>
                      <DateTimePickerComponent name="date" value={this.state.date} id="datetimepicker" placeholder="Select a date and time" onChange={this.handleInputChange} />
                    </div>
                    <br></br>
                    <FormBtn
                      style={{ width: "10rem" }}
                      disabled={!(this.state.description && this.state.title)}
                      onClick={this.handleFormSubmit}
                    >
                      Create Event
                    </FormBtn>
                  </form>
                </Col>

                {/* <Col size="sm-1" /> */}

              </Row>
            </Card.Body>
          </Card>
            {/* <Jumbotron id="createEvent" >
              <h1 id="text">Create an Event</h1>
            </Jumbotron> */}
          </Col>
          {/* <Col size="sm-1" /> */}

        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(CreateEvent);
