import React from "react";

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import LettersAvatar from "../components/useravatar";
import API from "../utils/API";
import UserEventCard from "../components/userEventCard";
import UserCard from "../components/usercard";

import { Col, Row } from 'react-bootstrap';

import { connect } from 'react-redux';


//Function to map our current state as props
const mapStateToProps = (state) => {
    return {
        id: state.authState.id,
        first_name: state.authState.first_name,
        last_name: state.authState.last_name,
        email: state.authState.email,
    };
}

class UserProfile extends React.Component {

    state = {
        user: {},
        userId: this.props.match.params.id,
        userEventsUserCreated: [],
        userEventsUserAttendingNotCreated: [],
        displayAllCreatedEventsByUser: false,
        displayAllEventsUserAttendingNotCreated: false,
    }

    // when this component mounts it grabs the user by their user id
    componentDidMount() {

        this.getUser();

        // Get all events user is attending (including the events they created)
        this.getEvents()
    }

    getUser = () => {
        // Get user details
        API.findUserById(this.state.userId)
            .then(res => {
                this.setState({ user: res.data ? res.data : {} }) // If user does not exist, set state.user to empty object
            }).catch(err => {
                console.log(err)
            });
    }

    getEvents = async () => {
        Promise.all([
            this.findEventsUserCreated(),
            this.findEventsUserAttendingNotCreated()
        ])
    }

    compareAuthenticatedUserToOther(userId) {
        return this.props.id === userId;
    }

    findEventsUserCreated = () => {
        API.findEventsUserCreatedOnly(this.state.userId)
            .then(res => {
                this.setState({ userEventsUserCreated: res.data })
            })
            .catch(err => console.log(err))
    }

    findEventsUserAttendingNotCreated = () => {
        API.findEventsUserAttendingNotCreated(this.state.userId)
            .then(res => {
                this.setState({ userEventsUserAttendingNotCreated: res.data })
            })
            .catch(err => console.log(err))
    }

    /**
     * Delete event by id only if user created the event
     */
    onDelete = (id) => {
        API.deleteEvent(id)
            .then(response => {
                const updatedUserEvents = this.state.userEventsUserCreated.filter(userEvent => {
                    return userEvent.event_id._id !== response.data._id
                })
                this.setState({ userEventsUserCreated: updatedUserEvents })
            })
            .catch(err => console.log(err.response));
    }

    renderCreatedEvents = () => {
        return this.renderEvents(true)
    }

    renderEventsAttendingNotCreated = () => {
        return this.renderEvents(false)
    }

    renderEvents = (editable) => {
        const events = [];
        let userEvents;
        let numEventsDisplay;

        if (editable) {
            userEvents = this.state.userEventsUserCreated;
            numEventsDisplay = this.state.displayAllCreatedEventsByUser ? userEvents.length : 3;
        } else {
            userEvents = this.state.userEventsUserAttendingNotCreated
            numEventsDisplay = this.state.displayAllEventsUserAttendingNotCreated ? userEvents.length : 3;
        }

        for (let i = 0; i < userEvents.length && i < numEventsDisplay; i++) {
            const userEvent = userEvents[i];
            events.push(
                <UserEventCard
                    title={userEvent.event_id.title}
                    description={userEvent.event_id.description}
                    date={userEvent.event_id.date}
                    key={userEvent._id}
                    id={userEvent.event_id._id}
                    onDelete={
                        this.compareAuthenticatedUserToOther(userEvent.user_id) && editable ?
                            () => this.onDelete(userEvent.event_id._id)
                            : null
                    }
                />
            )
        }

        return events;
    }

    handleShowAllUserCreatedEventsClick = () => {
        const updatedBool = !this.state.displayAllCreatedEventsByUser;
        this.setState({ displayAllCreatedEventsByUser: updatedBool })
    }

    handleShowAllUserAttendingNotCreatedEvents = () => {
        const updatedBool = !this.state.displayAllEventsUserAttendingNotCreated;
        this.setState({ displayAllEventsUserAttendingNotCreated: updatedBool })
    }

    render() {
        return (
            this.state.user._id ? (
                <Container>
                    <Card >
                        <Row>
                            <Col md={4}>
                                <Grid
                                    style={{ marginTop: '2rem' }}
                                    item md={1} container direction="column"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <div>
                                        <Grid style={{ paddingBottom: '1rem' }} container direction="row" justify="center" alignItems="center">
                                            <LettersAvatar />
                                        </Grid>
                                        <Grid container direction="row" justify="center" alignItems="center">
                                            <UserCard user={this.state.user} />
                                        </Grid>
                                    </div>
                                </Grid>
                            </Col>
                            <Col md={8}>

                            </Col>
                        </Row>

                        <Row style={{ marginBottom: '5rem' }} id='created-events'>

                            <Col style={{ marginTop: '5rem' }}>
                                <h2
                                    style={{ textAlign: 'center' }}>
                                    Events Created by {this.state.user.full_name} ({this.state.userEventsUserCreated.length})
                                    <Button color="primary" onClick={this.handleShowAllUserCreatedEventsClick}>
                                        {
                                            this.state.displayAllCreatedEventsByUser ? 'Collapse' : 'Show all events'
                                        }
                                    </Button>
                                </h2>

                                {
                                    this.renderCreatedEvents()
                                }
                            </Col>
                        </Row>

                        <Row id='not-created-but-attending-events'>
                            <Col style={{ marginTop: '5rem' }}>
                                <h2
                                    style={{ textAlign: 'center' }}
                                >
                                    Other Events {this.state.user.full_name} is Attending ({this.state.userEventsUserAttendingNotCreated.length})
                                    <Button color="primary" onClick={this.handleShowAllUserAttendingNotCreatedEvents}>
                                        {
                                            this.state.displayAllEventsUserAttendingNotCreated ? 'Collapse' : 'Show all events'
                                        }
                                    </Button>
                                </h2>

                                {
                                    this.renderEventsAttendingNotCreated()
                                }
                            </Col>
                        </Row>

                    </Card>


                </Container>
            ) : (
                    <h2>User does not exist</h2>
                )
        )
    }
}

export default connect(mapStateToProps)(UserProfile);
