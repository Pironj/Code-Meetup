import React from 'react';

import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

import GoogleApiWrapper from '../components/googleMaps';

import { connect } from 'react-redux';

import API from '../utils/API';
import CommentBox from '../components/commentbox';
import FullEvent from '../components/fullEvent';
import UserCard from '../components/userCard'
import './style.css';

const mapStateToProps = (state) => {
	return {
		id: state.authState.id,
		first_name: state.authState.first_name,
		last_name: state.authState.last_name,
		email: state.authState.email,
		token: state.authState.token
	};
};

class NamedUser {
	constructor(first_name, last_name) {
		this.first_name = first_name;
		this.last_name = last_name;
	}
}

class EventDetailsPage extends React.Component {

	state = {
		event: {},
		eventId: this.props.match.params.id,
		userId: this.props.id,
		comments: [],
		attendees: [],
		attend: false,
		btnColor: { backgroundImage: 'linear-gradient(to right, #042003 0%, #33AF16 73%, #042002 100%)' }
	};

	//Here we are finding specific event ID on first render
	async componentDidMount() {
		Promise.all([this.getEvent(), this.getUserAttendenceForEvent(), this.getAttendingUsers()])
	}

	getAttendingUsers = () => {
		API.findUsersForEvent(this.state.eventId)
			.then(res => {
				const attendingUsers = res.data.map(userEvent => {
					const user = userEvent.user_id;
					return new NamedUser(user.first_name, user.last_name)
				})
				this.setState({ attendees: attendingUsers })
			}).catch(err => {
				console.log(err)
			})
	}

	getUserAttendenceForEvent = () => {
		API.findUserEventByUserIdEventId(this.state.userId, this.state.eventId)
			.then((res) => {
				if (res.data) {
					this.setState({
						attend: true,
					});
				}
			})
			.catch((err) => console.log(err));
	}

	getEvent = () => {
		API.findEventById(this.state.eventId)
			.then(res => {
				if (res.data) { // event exists
					this.setState({
						event: res.data
					});
				}
			})
			.catch(err => console.log(err));
	}

	renderAttendees = () => {
		return this.state.attendees.map(user => (
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
				event_id: this.state.eventId,
			})
				.then(res => {
					const attendees = this.state.attendees
					attendees.push(new NamedUser(this.props.first_name, this.props.last_name))
					this.setState({ attend: true, attendees });
					this.changeText();
				})
				.catch(err => {
					console.log(err.response)
				});
		} else if (this.state.attend && this.state.event.creator._id !== this.state.userId) {
			API.deleteUserEventByUserIdEventId(this.state.userId, this.state.eventId)
				.then(res => {
					const attendees = this.state.attendees.filter(user => {
						return user.first_name !== this.props.first_name;
					})
					this.setState({ attend: false, attendees });
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

	renderFullEvent = () => {
		return (
			<FullEvent
				title={this.state.event.title}
				description={this.state.event.description}
				key={this.state.event._id}
				id={this.state.event._id}
				date={this.state.event.date}
				creator={this.state.event.hasOwnProperty('creator') ? this.state.event.creator.first_name : ''}
				address={this.state.event.street_address}
				latitude={this.state.event.location.coordinates[1]}
				longitude={this.state.event.location.coordinates[0]}
			/>
		);
	};

	render() {
		return (
			<div>
				{
					this.state.event._id ?
						<Container id="eventDetail">

							<Row style={{ marginTop: '2rem' }}>
								<Col>

									{this.renderFullEvent()}

									{
										this.props.id ?
											<Button id="attend" onClick={this.onAttend} style={this.state.btnColor} variant="dark">
												{this.state.attend ? 'Attending' : 'Attend'}
											</Button>
											:
											<div></div>
									}
								</Col>

								<Col>
									{
										this.state.event._id ? (
											<GoogleApiWrapper
												key={this.state.event._id}
												latitude={this.state.event.location.coordinates[1]}
												longitude={this.state.event.location.coordinates[0]}
											/>
										) : (
												<p>Loading map...</p>
											)
									}
								</Col>
							</Row>

							<Row id="attending-users">
								<Col>
									<h2>Attendees ({this.state.attendees.length})</h2>
									<Container>{this.renderAttendees()}</Container>
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

export default connect(mapStateToProps)(EventDetailsPage);
