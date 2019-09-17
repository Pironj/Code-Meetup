import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, Row, Col
  //  Button
} from 'react-bootstrap';

import Button from '@material-ui/core/Button';

import Fab from '@material-ui/core/Fab';

import { Link as RouterLink } from 'react-router-dom';

import GoogleApiWrapper from '../components/googleMaps';

import { connect } from 'react-redux';
import { initEventState, removeEvent, updateEventStateOnAuthChange, updateUserAttendance } from '../redux/actions/eventDetailActions';

import API from '../utils/API';
import CommentBox from '../components/commentbox';
import FullEvent from '../components/fullEvent';
import UserCard from '../components/usercard';
import './style.css';


// Get redux store state
const mapStateToProps = (state) => {
  return {
    // authState
    id: state.authState.id,

    // eventDetail
    event: state.eventDetail.event,
    attendees: state.eventDetail.attendees,
    numEventLikes: state.eventDetail.numEventLikes,
    isAttending: state.eventDetail.isAttending,
  };
};

// Get redux store actions
const mapDispatchToProps = (dispatch) => {
  return {
    initEventState: (eventId) => {
      dispatch(initEventState(eventId));
    },
    removeEvent: () => {
      dispatch(removeEvent());
    },
    updateEventStateOnAuthChange: (eventId) => {
      dispatch(updateEventStateOnAuthChange(eventId));
    },
    updateUserAttendance: (eventId) => {
      dispatch(updateUserAttendance(eventId));
    },
  };
};

const attendBtnStyle = {
  isAttending: {
    backgroundImage: 'linear-gradient(to right, #042003 0%, #33AF16 73%, #042002 100%)'
  },
  isNotAttending: {
    btnColor: { backgroundImage: 'linear-gradient(to right, #0F142D 0%, #2D3A81 70%, #3F51B5 100%)' },
  }
};


class EventDetailsPage extends React.Component {

	state = {
	  eventId: this.props.match.params.id,
	  comments: [],
	  showAllAttendees: false,
	};

	//Here we are finding specific event ID on first render
	componentDidMount() {
	  this.props.initEventState(this.state.eventId);
	}

	componentWillUnmount() {
	  this.props.removeEvent();
	}

	//When user hits Attend button, a new UserEvent is created
	onAttend = () => {
	  if (this.props.event.creator._id === this.props.id) { // determine if logged in user is the event's creator
	    alert('You cannot remove yourself from your created event');
	  } else {
	    this.props.updateUserAttendance(this.state.eventId);
	  }
	};

	deleteEvent = () => {
	  API.deleteEvent(this.props.event._id)
	    .then(response => {
	      this.props.history.push('/');
	    })
	    .catch(err => console.log(err.response));
	}

	setColorOnAttendEventClick = () => {
	  let backgroundImage;
	  if (this.props.isAttending) {
	    backgroundImage = attendBtnStyle.isAttending;
	  } else {
	    backgroundImage = attendBtnStyle.isNotAttending;
	  }
	  return backgroundImage;
	}

	handleShowAllAttendeesClick = () => {
	  const updatedBool = !this.state.showAllAttendees;
	  this.setState({ showAllAttendees: updatedBool });
	}

	handleAuthChange = () => {
	  this.props.updateEventStateOnAuthChange(this.state.eventId);
	}

	renderAttendees = () => {
	  const attendees = [];
	  const numAttendeesDisplay = this.state.showAllAttendees ? this.props.attendees.length : 3;

	  for (let i = 0; i < this.props.attendees.length && i < numAttendeesDisplay; i++) {
	    const attendee = this.props.attendees[i];
	    attendees.push(
	      <UserCard
	        key={attendee._id}
	        user={attendee}
	      />
	    );
	  }

	  return attendees;
	}

	renderFullEvent = () => {
	  return (
	    <FullEvent
	      title={this.props.event.title}
	      description={this.props.event.description}
	      key={this.state.eventId}
	      id={this.state.eventId}
	      date={this.props.event.date}
	      creator={
	        this.props.event.hasOwnProperty('creator') ?
	          this.props.event.creator.full_name
	          : ''
	      }
	      address={this.props.event.street_address}
	      latitude={this.props.event.location.coordinates[1]}
	      longitude={this.props.event.location.coordinates[0]}
	    />
	  );
	};

	render() {
	  return (
	    <div>
	      {/* Handle show/hide UI buttons on login/logout */}
	      {/* Better way to do this??? */}
	      {this.handleAuthChange()}

	      {
	        this.props.event._id ?
	          <Container id="eventDetail">

	            <Row style={{ marginTop: '2rem' }}>
	              <Col>

	                {/* Render Event */}
	                {
	                  this.renderFullEvent()
	                }

	              </Col>

	              {/* Google map for event */}
	              <Col>
	                {
	                  this.props.event._id ? (
	                    <GoogleApiWrapper
	                      key={this.props.event._id}
	                      latitude={this.props.event.location.coordinates[1]}
	                      longitude={this.props.event.location.coordinates[0]}
	                    />
	                  ) : (
	                    <p>Loading map...</p>
	                  )
	                }
	              </Col>
	            </Row>

	            {/* Attend event operation */}
	            <Row id='attend-event-operation'>
	              {
	                this.props.id ?
	                  <Button id="attend" onClick={this.onAttend} style={{ ...this.setColorOnAttendEventClick() }} variant="info">
	                    {this.props.isAttending ? 'Attending' : 'Attend'}
	                  </Button>
	                  :
	                  ''
	              }

	              {/* Modify event buttons */}
	              {
	                this.props.event.creator._id === this.props.id ? // determine if logged in user is the event's creator
	                  <React.Fragment>
	                    <Fab
	                      variant="extended"
	                      size="small"
	                      color="secondary"
	                      aria-label="add"
	                      component={RouterLink}
	                      to={`/events/${this.props.event._id}/edit`}
	                    >
												Edit
	                    </Fab>

	                    <Fab
	                      variant="extended"
	                      size="small"
	                      color="secondary"
	                      aria-label="add"
	                      onClick={this.deleteEvent}
	                    >
												Delete
	                    </Fab>
	                  </React.Fragment>
	                  : ''
	              }
	            </Row>

	            {/* Attendees Controls*/}
	            <Row id="attending-users">

	              <div>
	                <h2 style={{ display: 'inline-block' }} >Attendees ({this.props.attendees.length})</h2>

	                <Button style={{ display: 'inline-block' }} color="primary" onClick={this.handleShowAllAttendeesClick}>
	                  {
	                    this.state.showAllAttendees ? 'Collapse' : 'Show all attendees'
	                  }
	                </Button>
	              </div>

	            </Row>

	            {/* Attendees */}
	            <Row>
	              {
	                this.renderAttendees()
	              }
	            </Row>

	            {/* Comments */}
	            <Row id="commentRow">
	              <Col md={1} />
	              <Col md={10}>
	                <CommentBox eventId={this.state.eventId} />
	              </Col>
	              <Col md={1} />
	            </Row>
	          </Container>
	          :
	          <p>This event does not exist</p>
	      }
	    </div>
	  );
	}
}

EventDetailsPage.propTypes = {
  // state
  id: PropTypes.string,
  event: PropTypes.object,
  attendees: PropTypes.arrayOf(PropTypes.object),
  numEventLikes: PropTypes.number,
  isAttending: PropTypes.bool,

  // functions
  initEventState: PropTypes.func,
  removeEvent: PropTypes.func,
  updateEventStateOnAuthChange: PropTypes.func,
  updateUserAttendance: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsPage);
