import React from 'react';
import API from '../utils/API';
import CommentBox from '../components/commentbox';
import FullEvent from '../components/fullEvent';
import './style.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

import GoogleApiWrapper from '../components/googleMaps';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		id: state.authState.id,
		first_name: state.authState.first_name,
		last_name: state.authState.last_name,
		email: state.authState.email,
		token: state.authState.token
	};
};

class EventDetailsPage extends React.Component {
	state = {
		event: {},
		eventId: '',
		userId: '',
		comments: [],
		attend: false,
		text: 'Attend',
		btnColor: { backgroundImage: 'linear-gradient(to right, #042003 0%, #33AF16 73%, #042002 100%)' }
	};
	componentWillMount() {
		this.setState({
			eventId: this.props.match.params.id,
			userId: this.props.id
		});
	}

	//When user hits Attend button, a new user event is created
	onAttend = () => {
		if (this.state.attend === false) {
			this.setState({ attend: true });
			API.createUserEvent({
				event_id: this.state.eventId,
				user_id: this.state.userId
			})
				.then((res) => {
					this.changeText();
				})
				.catch((err) => console.log(err));
		} else if (this.state.attend === true && this.state.event.creator._id !== this.state.userId) {
			this.setState({ attend: false });
			API.deleteUserEventByUserIdEventId(this.state.userId, this.state.eventId)
				.then((res) => {
					this.changeText();
				})
				.catch((err) => console.log(err));
		} else {
      return alert("You cannot remove yourself from your created event");
    
    }
	};
	// function that alter button state text
	changeText = () => {
		if (this.state.attend === true) {
			this.setState({
				text: 'Attending',
				btnColor: { backgroundImage: 'linear-gradient(to right, #042003 0%, #33AF16 73%, #042002 100%)' },
				width: '3rem',
				height: '.5rem'
			});
		} else if (this.state.attend === false) {
			this.setState({
				text: 'Attend',
				btnColor: { backgroundImage: 'linear-gradient(to right, #0F142D 0%, #2D3A81 70%, #3F51B5 100%)' },
				width: '3rem',
				height: '.5rem'
			});
		}
	};

	//Here we are finding specific event ID on first render
	componentDidMount() {
		API.findEventById(this.state.eventId)
			.then((data) => {
				this.setState({
					event: data.data
				});
			})
			.catch((err) => console.log(err));
		API.findUserEventByUserIdEventId(this.state.userId, this.state.eventId)
			.then((res) => {
				if (res.data) {
					this.setState({
						attend: true,
						text: 'Attending'
					});
				}
				if (!res.data) {
					this.setState({
						attend: false,
						text: 'Attend'
					});
				}
			})
			.catch((err) => console.log(err));
	}

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
				<Container id="eventDetail">
					<Row style={{ marginTop: '2rem' }}>
						<Col>
							{/* TODO -> Need to change this conditional */}
							{this.state.event._id ? this.renderFullEvent() : <p>This event does not exist</p>}
						</Col>
						<Col>
							{this.state.event._id ? (
								<GoogleApiWrapper
									key={this.state.event._id}
									latitude={this.state.event.location.coordinates[1]}
									longitude={this.state.event.location.coordinates[0]}
								/>
							) : (
								<p>Loading map...</p>
							)}
						</Col>
					</Row>
					<Row style={{ marginTop: '1rem' }}>
						{this.props.first_name ? (
							<Button id="attend" onClick={this.onAttend} style={this.state.btnColor} variant="dark">
								{this.state.text}
							</Button>
						) : (
							{
								/* <div></div> */
							}
						)}
					</Row>
					<Row>
						<Col md={3} />
						<Col md={6}>
							<CommentBox eventId={this.state.eventId} />
						</Col>
            <Col md={3} />
					</Row>
				</Container>
			</div>
		);
	}
}

export default connect(mapStateToProps)(EventDetailsPage);
