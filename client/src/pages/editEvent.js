import React from "react";
import API from "../utils/API";
// import FullEvent from "../components/fullEvent";
// import FooterComponent from "../components/footer";
// import axios from "axios";
import { Jumbotron, Container, Row, Col, Button } from "react-bootstrap";
import LocationSearchInput from "../components/googleMapsSearchAutocomplete";
import { connect } from 'react-redux';
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
// import Calendar from "../components/calendar"
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';




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

class EditEvent extends React.Component {

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

  // Here we run componentDidMount async for proper error handling
  async componentDidMount() {
    await this.setState({ 
      eventId: this.props.match.params.id,
      creator: this.props.id,
    })
    this.populateEvent();
  }


  //Function to find specific event that user wants to edit
  populateEvent() {
    API.findEventById(this.state.eventId)
      .then(response => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          date: response.data.date,
          // streetAddress: response.data.street_address,
        })
        console.log(response)
      }).catch(err => console.log(err));
  }

//
  handleInputChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState({
      [name]: value
    });
  };

//When user hits submit to edit event, DB is updated as well

  handleFormSubmit = event => {
    console.log(this.state);
    event.preventDefault();
    if (this.state.title && this.state.description) {
      API.updateEvent({
        id: this.state.eventId, // Event id
        title: this.state.title,
        description: this.state.description,
        date: this.state.date,
        street_address: this.state.streetAddress,
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

  handleLocationSearchChange = streetAddress => {
    this.setState({ streetAddress });
  };

  handleLocationSearchSelect = async address => {
    await this.setState({ streetAddress: address })
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

              {/* <div className="input-field">
                <label style={{ marginLeft: '.5rem' }} htmlFor="name">Street address</label>
                <input type="text" name="streetAddress" ref="streetAddress" value={this.state.street_address}
                  onChange={this.handleInputChange.bind(this)} />
              </div> */}

              <div className="input-field">
                <label style={{ marginLeft: '.5rem' }} htmlFor="name">Location</label>
                <LocationSearchInput
                  value={this.state.streetAddress}
                  onChange={this.handleLocationSearchChange}
                  onSelect={this.handleLocationSearchSelect}
                />
              </div>
              <div>
                {/* <Calendar /> */}
              </div>
              <div>
              <DateTimePickerComponent name="date" value={this.state.date} id="datetimepicker" placeholder="Select a date and time" onChange={this.handleInputChange}/>
                {/* <Date /> */}
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