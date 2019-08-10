import React from "react";
import API from "../utils/API";
import { Row, Col, Button, Jumbotron } from "react-bootstrap";
import LocationSearchInput from "../components/googleMapsSearchAutocomplete";
import { connect } from 'react-redux';
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
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
      }).catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //When user hits submit to edit event, DB is updated as well

  handleFormSubmit = event => {
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
        .catch(err => console.log(err.response));
    }

  }

  handleLocationSearchChange = streetAddress => {
    this.setState({ streetAddress });
  };

  handleLocationSearchSelect = async address => {
    await this.setState({ streetAddress: address })
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(async latLng => {
        await this.setState({ latLng })
      })
      .catch(error => console.error('Error', error));
  };

  render() {

    return (

      <div>
        {/* {'creator: ' + this.props.id} */}
        <Row>
        <Col sm={3} />
          <Col xsß={6}  xs={3}>
          <Jumbotron id="createEvent" style={{ textAlign: 'center', width: '40rem', marginTop: '3rem' }}>
              <h1 id="text">Edit Event</h1>
            </Jumbotron>

            <form style={{ marginRight: '2rem'}} onSubmit={this.handleFormSubmit}>



              <div className="input-field">
                <label style={{ marginLeft: '.5rem'}} htmlFor="name">Title</label>
                <input  style={{width: '25rem', paddingLeft: '.25rem', borderRadius: '1rem', borderWidth: '.10rem', borderColor: '#BDC7D8'}} type="text" name="title" ref="title" value={this.state.title}
                  onChange={this.handleInputChange.bind(this)} />

              </div>

              <div className="input-field">
                <label style={{ marginLeft: '.5rem' }} htmlFor="name">Description</label>
                <textarea style={{width: '25rem', height:'10rem', paddingLeft: '.25rem', borderRadius: '1rem', borderWidth: '.10rem', borderColor: '#BDC7D8'}} type="text" name="description" ref="description" value={this.state.description}
                  onChange={this.handleInputChange.bind(this)} />
              </div>

              <div className="input-field">
                <label style={{ marginLeft: '.5rem' }} htmlFor="name">Date</label>
                <input style={{width: '25rem', paddingLeft: '.25rem', borderRadius: '1rem', borderWidth: '.10rem', borderColor: '#BDC7D8'}} type="text" name="date" ref="date" value={this.state.date}
                  onChange={this.handleInputChange.bind(this)} />
               <DateTimePickerComponent style={{width: '50rem', marginLeft: '1rem', margintTop: '1rem'}} name="date" value={this.state.date} id="datetimepicker" placeholder="Select a date and time" onChange={this.handleInputChange} />


              </div>

              <div className="input-field">
                <label style={{ marginLeft: '.5rem' }} htmlFor="name">Location</label>
                <LocationSearchInput
                  style={{paddingLeft: '.25rem', borderRadius: '1rem', borderWidth: '.10rem', borderColor: '#BDC7D8'}}
                  value={this.state.streetAddress}
                  onChange={this.handleLocationSearchChange}
                  onSelect={this.handleLocationSearchSelect}
                />
              </div>

              <div>                
              
              {/* <DateTimePickerComponent style={{width: '50rem'}} name="date" value={this.state.date} id="datetimepicker" placeholder="Select a date and time" onChange={this.handleInputChange} /> */}
              </div>
              <Button style={{marginBottom: '10rem', marginTop: '1rem'}}type="submit" value="Save" className="btn" variant="dark">Save</Button>
            </form>
          </Col>
          <Col sm={3} />
        </Row>
      </div>


    )
  }
}



export default connect(mapStateToProps)(EditEvent);