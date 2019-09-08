import React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

import { Link as RouterLink } from 'react-router-dom';

import GoogleApiWrapper from '../components/googleMaps';

import { connect } from 'react-redux';
import { getEvent, removeEvent, getAttendingUsers } from '../redux/actions/eventDetailActions';

import API from '../utils/API';
import { NamedUser } from '../utils/classes';
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
		numEventLikes: 0,
		isAttending: false,
		userLikesEvent: false,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getEvent: (eventId) => {
			dispatch(getEvent(eventId))
		},
		removeEvent: () => {
			dispatch(removeEvent());
		},
		getAttendingUsers: (eventId) => {
			dispatch(getAttendingUsers(eventId))
		},
	}
}

class EventDetailsPage extends React.Component {

	state = {
		// event: {},
		eventId: this.props.match.params.id,
		comments: [],
		// attendees: [],
		attend: false,
		numEventLikes: 0,
		userLikesEvent: false,
		btnColor: { backgroundImage: 'linear-gradient(to right, #042003 0%, #33AF16 73%, #042002 100%)' },
	};

	//Here we are finding specific event ID on first render
	componentDidMount() {


		Promise.all([
			this.props.getEvent(this.state.eventId),
			this.props.getAttendingUsers(this.state.eventId),
			// this.getEvent(),
			// this.getNumEventLikes(),
			// this.getAttendingUsers(),
			// this.getUserLikesEvent(),
			// this.getUserAttendenceForEvent(),
		])
	}

	componentDidUpdate() {
		// 	console.log(this.state.userId)
		// 	console.log(this.props.id)
		// 	if (this.state.userId !== this.props.id) {
		// 		this.setState({userID: this.props.id})

		// 	}
		// Promise.all([
		// 	this.getUserLikesEvent(),
		// 	this.getUserAttendenceForEvent(),
		// ])
	}

	componentWillUnmount() {
		this.props.removeEvent();
	}

	// getAttendingUsers = () => {
	// 	API.findUsersForEvent(this.props.eventId)
	// 		.then(res => {
	// 			const attendingUsers = res.data.map(userEvent => {
	// 				const user = userEvent.user_id;
	// 				return new NamedUser(user.first_name, user.last_name, user._id)
	// 			})
	// 			this.setState({ attendees: attendingUsers })
	// 		}).catch(err => {
	// 			console.log(err)
	// 		})
	// }

	getUserAttendenceForEvent = () => {
		API.findUserEventByUserIdEventId(this.props.eventId)
			.then((res) => {
				if (res.data) {
					this.setState({
						attend: true,
					});
				}
			})
			.catch((err) => console.log(err));
	}

	getNumEventLikes = () => {
		API.findEventLikesForEvent(this.props.eventId)
			.then(res => {
				if (res.data) {
					this.setState({
						numEventLikes: res.data.numLikes
					})
				}
			}).catch(err => {
				console.log(err.response);
			})
	}

	getUserLikesEvent = () => {
		API.findEventLikeByUserIdEventId(this.props.eventId)
			.then(res => {
				if (res.data) {
					this.setState({ userLikesEvent: true })
				}
			})
	}

	/**
	 * Like or unlike the event. Updates number of likes for event 
	 */
	handleEventLikeClick = () => {
		if (this.state.userLikesEvent) {
			API.deleteEventLikeByUserIdEventId(this.props.eventId)
				.then(res => {
					this.setState({ userLikesEvent: false, numEventLikes: this.state.numEventLikes - 1 })
				})
				.catch(err => {
					console.log(err.response);
				})
		} else {
			API.createEventLike({ event_id: this.props.eventId })
				.then(res => {
					this.setState({ userLikesEvent: true, numEventLikes: this.state.numEventLikes + 1 })
				})
				.catch(err => {
					console.log(err.response);
				})
		}
	}

	renderAttendees = () => {
		return this.props.attendees.map(user => (
			<UserCard
				key={user.first_name}
				user={user}
			/>
		))
	}

	//When user hits Attend button, a new UserEvent is created
	onAttend = () => {
		if (!this.state.attend) {
			API.createUserEvent({
				event_id: this.props.eventId,
			})
				.then(res => {
					// const attendees = this.state.attendees
					// attendees.push(new NamedUser(this.props.first_name, this.props.last_name, this.props.id))
					// this.setState({ attend: true, attendees });
					this.changeText();
				})
				.catch(err => {
					console.log(err.response)
				});
		} else if (this.state.attend && !(this.props.event.creator._id === this.props.id)) { // determine if logged in user is the event's creator
			API.deleteUserEventByUserIdEventId(this.props.eventId)
				.then(res => {
					// const attendees = this.state.attendees.filter(user => {
					// 	return user.first_name !== this.props.first_name;
					// })
					// this.setState({ attend: false, attendees });
					this.changeText();
				})
				.catch((err) => console.log(err.response));
		} else {
			alert("You cannot remove yourself from your created event");
		}
	};

	// function that alter button state text
	changeText = () => {
		if (this.state.attend) {
			this.setState({
				btnColor: { backgroundImage: 'linear-gradient(to right, #042003 0%, #33AF16 73%, #042002 100%)' },
				width: '3rem',
				height: '.5rem'
			});
		} else {
			this.setState({
				btnColor: { backgroundImage: 'linear-gradient(to right, #0F142D 0%, #2D3A81 70%, #3F51B5 100%)' },
				width: '3rem',
				height: '.5rem'
			});
		}
	};

	deleteEvent = () => {
		API.deleteEvent(this.props.event._id)
			.then(response => {
				this.props.history.push('/');
			})
			.catch(err => console.log(err.response));
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
												this.state.userLikesEvent ?
													<ThumbUpIcon />
													:
													<ThumbUpOutlinedIcon />
											}
										</IconButton>
										:
										<ThumbUpOutlinedIcon />
								}

								{
									this.state.numEventLikes
								}

							</Row>

							<Row id='attend-event-operation'>
								{/* Attend event operation */}
								{
									this.props.id ?
										<Button id="attend" onClick={this.onAttend} style={this.state.btnColor} variant="dark">
											{this.state.attend ? 'Attending' : 'Attend'}
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
