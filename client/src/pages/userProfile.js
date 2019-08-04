import React from "react";
import UserCard from "../components/usercard";
import LettersAvatar from "../components/useravatar";
import API from "../utils/API";
import UserEventCard from "../components/userEventCard";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { DeleteBtn, createEventBtn, EditEventBtn, cancelBtn } from "../components/btn";
import { Col, Row } from 'react-bootstrap';


// const useStyles = makeStyles({
//     container: {
//         backgroundColor: grey[400]
//     }
// });

class UserProfile extends React.Component {

    state = {
        user: {},
        userId: '',
        events: [],
    }

    componentWillMount() {
        this.setState({ userId: this.props.match.params.id })
    }

    // when this component mounts it grabs the user by their user id
    componentDidMount() {

        // Get user details
        API.findUserById(this.state.userId)
            .then(res => {
                this.setState({ user: res.data })
            }).catch(err => {
                console.log(err)
            });

        // Get all events user is attending (including the events they created)
        API.findEventsForUser(this.state.userId)
            .then(res => {

                this.setState({ events: res.data })
            })
            .catch(err => console.log(err))
    };

    /**
     * Delete event
     */
    onDelete = (id) => {
        API.deleteEvent(id)
            .then(response => {
                console.log(response)

            }).catch(err => console.log(err));
    }

    /**
     * Render UserEvent cards
     */
    renderEventCards = () => {
        return this.state.events.map(userEvent => {
            if (userEvent.event_id.creator === this.state.userId) {
                return (
                    <div>
                        <UserEventCard
                            title={userEvent.event_id.title}
                            description={userEvent.event_id.description}
                            date={userEvent.event_id.date}
                            key={userEvent._id}
                            id={userEvent.event_id._id}
                            onDelete={() => this.onDelete(userEvent._id)}
                        />
                    </div>
                )
            } else {
                return (
                    <div>
                        <UserEventCard
                            title={userEvent.event_id.title}
                            description={userEvent.event_id.description}
                            date={userEvent.event_id.date}
                            key={userEvent._id}
                            id={userEvent.event_id._id}
                            onDelete={() => this.onDelete(userEvent._id)}
                        />
                    </div>

                )
            }
        })
    }

    /** 
     * Render events user created and is attending
    */
    // renderEventsCreated = () => {
    //     return this.renderEventCards()
    // }

    /**
     * Render event cards user is attending but did not create
     */
    // renderEventsAttending = () => {
    //     return this.renderEventCards();
    // }

    render() {
        return (
            <div>
                <div>
                    <Grid
                        style={{ marginTop: '2rem' }}
                        item md={1} container direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <div>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <LettersAvatar />
                            </Grid>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <UserCard user={this.state.user} />
                            </Grid>
                        </div>
                    </Grid>
                </div>
                <div>
                    <Grid item md={12} container direction="row" justify="center" alignItems="center">
                        <createEventBtn />
                    </Grid>
                </div>
                <Row>
                    <Col>
                        <h2>Events You Created</h2>
                        {
                            this.state.events.map(userEvent => (
                                userEvent.event_id.creator === this.state.userId ? (
                                    <UserEventCard
                                        title={userEvent.event_id.title}
                                        description={userEvent.event_id.description}
                                        date={userEvent.event_id.date}
                                        key={userEvent._id}
                                        id={userEvent.event_id._id}
                                        onDelete={() => this.onDelete(userEvent._id)}
                                    />
                                ) :
                                    ''
                            ))
                        }


                    </Col>
                    <Col id="attending">
                        <h2>Events You Are Attending</h2>
                        {
                            this.state.events.map(userEvent => (
                                userEvent.event_id.creator !== this.state.userId ? (
                                    <UserEventCard
                                        title={userEvent.event_id.title}
                                        description={userEvent.event_id.description}
                                        date={userEvent.event_id.date}
                                        key={userEvent._id}
                                        id={userEvent.event_id._id}
                                        onDelete={() => this.onDelete(userEvent._id)}
                                    />
                                ) :
                                    ''
                            ))
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

export default UserProfile;

