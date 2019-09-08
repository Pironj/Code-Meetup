import React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

import { Link as RouterLink } from 'react-router-dom';

import GoogleApiWrapper from '../components/googleMaps';

import { connect } from 'react-redux';
import { initEventState, removeEvent, updateUserLikesEvent, updateEventStateOnAuthChange, updateUserAttendance } from '../redux/actions/eventDetailActions';

import API from '../utils/API';
import CommentBox from '../components/commentbox';
import FullEvent from '../components/fullEvent';
import UserCard from '../components/usercard'
import './style.css';


const mapStateToProps = (state) => {
	return {
		// authState
		id: state.authState.id,
		first_name: state.authState.first_name,
		last_name: state.authState.last_name,
		email: state.authState.email,

		// eventDetail
		event: state.eventDetail.event,
		attendees: state.eventDetail.attendees,
		numEventLikes: state.eventDetail.numEventLikes,
		isAttending: state.eventDetail.isAttending,
		userLikesEvent: state.eventDetail.userLikesEvent,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		initEventState: (eventId) => {
			dispatch(initEventState(eventId))
		},
		removeEvent: () => {
			dispatch(removeEvent())
		},
		updateUserLikesEvent: (eventId) => {
			dispatch(updateUserLikesEvent(eventId))
		},
		updateEventStateOnAuthChange: (eventId) => {
			dispatch(updateEventStateOnAuthChange(eventId))
		},
		updateUserAttendance: (eventId) => {
			dispatch(updateUserAttendance(eventId));
		},
	}
}

const attendBtnStyle = {
	// width: '3rem',
	// height: '.5rem',
	isAttending: {
		backgroundImage: 'linear-gradient(to right, #042003 0%, #33AF16 73%, #042002 100%)'
	},
	isNotAttending: {
		btnColor: { backgroundImage: 'linear-gradient(to right, #0F142D 0%, #2D3A81 70%, #3F51B5 100%)' },
	}
}


class EventDetailsPage extends React.Component {

	state = {
		eventId: this.props.match.params.id,
		userId: this.props.id,
		comments: [],
	};

	//Here we are finding specific event ID on first render
	componentDidMount() {
		this.props.initEventState(this.state.eventId);
	}

	componentWillUnmount() {
		this.props.removeEvent();
	}

	UNSAFE_componentWillReceiveProps() { // NEED TO FIND A BETTER WAY TO LISTEN TO AUTH STATE CHANGE
		if (this.state.userId !== this.props.id) {
			this.setState({ userId: this.props.id })
			this.props.updateEventStateOnAuthChange(this.state.eventId);
		}
	}

	/**
	 * Like or unlike the event. Updates number of likes for event 
	 */
	handleEventLikeClick = () => {
		this.props.updateUserLikesEvent(this.state.eventId);
	}

	//When user hits Attend button, a new UserEvent is created
	onAttend = () => {
		if (this.props.event.creator._id === this.props.id) { // determine if logged in user is the event's creator
			alert("You cannot remove yourself from your created event");
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
			backgroundImage = attendBtnStyle.isAttending
		} else {
			backgroundImage = attendBtnStyle.isNotAttending
		}
		return backgroundImage
	}

	renderAttendees = () => {
		return this.props.attendees.map(user => (
			<UserCard
				key={user.first_name}
				user={user}
			/>
		))
	}

	renderFullEvent = () => {
		return (
			<FullEvent
				title={this.props.event.title}
				description={this.props.event.description}
				key={this.props.event._id}
				id={this.props.event._id}
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

							<Row id="like-event">

								{/* Like event buttons */}
								{
									this.props.id ?

										<IconButton
											color="primary"
											onClick={this.handleEventLikeClick}>
											{
												this.props.userLikesEvent ?
													<ThumbUpIcon />
													:
													<ThumbUpOutlinedIcon />
											}
										</IconButton>
										:
										<ThumbUpOutlinedIcon />
								}

								{
									this.props.numEventLikes
								}

							</Row>

							<Row id='attend-event-operation'>
								{/* Attend event operation */}
								{
									this.props.id ?
										<Button id="attend" onClick={this.onAttend} style={{ ...this.setColorOnAttendEventClick() }} variant="info">
											{this.props.isAttending ? 'Attending' : 'Attend'}
										</Button>
										:
										<div></div>
								}

							</Row>

							<Row id='event-operation buttons'>

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

							<Row id="attending-users">
								<Col>
									<h2>Attendees ({this.props.attendees.length})</h2>
									{
										this.renderAttendees()
									}
								</Col>

							</Row>

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

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsPage);
