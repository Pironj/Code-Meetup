import React from "react";
import UserCard from "../components/usercard";
import LettersAvatar from "../components/useravatar";
import API from "../utils/API";
import UserEventCard from "../components/userEventCard";
import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';
// import { grey } from '@material-ui/core/colors';
import { Col, Row } from 'react-bootstrap';


class UserProfile extends React.Component {

    state = {
        user: {},
        userId: '',
        userEvents: [],
    }

    // when this component mounts it grabs the user by their user id
    async componentDidMount() {
        await this.setState({ userId: this.props.match.params.id })

        this.getUser();

        // Get all events user is attending (including the events they created)
        this.getEventsUserAttends()
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

    getEventsUserAttends = () => {
        API.findEventsForUser(this.state.userId)
            .then(res => {
                this.setState({ userEvents: res.data })
            })
            .catch(err => console.log(err))
    }

    /**
     * Delete event
     */
    onDelete = (id) => {
        API.deleteEvent(id)
            .then(response => {
                const updatedUserEvents = this.state.userEvents.filter(userEvent => {
                    return userEvent.event_id._id !== response.data._id
                })
                this.setState({ userEvents: updatedUserEvents })
            }).catch(err => console.log(err));
    }

    render() {
        return (
            this.state.user._id ? (
                <div>
                    <div>
                        <Row>
                            <Col sm={1} />
                            <Col md={6}>
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
                            <Col md={4} />
                        </Row>
                    </div>
                    <Row style={{ marginBottom: '5rem' }}>
                        <Col md={2} />
                        <Col md={4} style={{ marginTop: '5rem' }}>
                            <h2 style={{ textAlign: 'center' }}>Events You Created</h2>
                            {
                                this.state.userEvents.map(userEvent => (
                                    userEvent.event_id.creator === this.state.userId ? (
                                        <UserEventCard
                                            title={userEvent.event_id.title}
                                            description={userEvent.event_id.description}
                                            date={userEvent.event_id.date}
                                            key={userEvent._id}
                                            id={userEvent.event_id._id}
                                            onDelete={() => this.onDelete(userEvent.event_id._id)}
                                        />
                                    ) :
                                        ''
                                ))
                            }
                        </Col>
                        <Col md={4} style={{ marginTop: '5rem' }} id="attending">
                            <h2 style={{ textAlign: 'center' }}>Events You Are Attending</h2>
                            {
                                this.state.userEvents.map(userEvent => (
                                    userEvent.event_id.creator !== this.state.userId ? (
                                        <UserEventCard
                                            title={userEvent.event_id.title}
                                            description={userEvent.event_id.description}
                                            date={userEvent.event_id.date}
                                            key={userEvent._id}
                                            id={userEvent.event_id._id}
                                        />
                                    ) :
                                        ''
                                ))
                            }
                        </Col>
                        <Col md={2} />
                    </Row>
                </div>
            ) : (
                    <h2>User does not exist</h2>
                )
        )
    }
}

export default UserProfile;
