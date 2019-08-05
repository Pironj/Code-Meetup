import React from "react";
import UserCard from "../components/usercard";
import LettersAvatar from "../components/useravatar";
import API from "../utils/API";
import UserEventCard from "../components/userEventCard";
import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';
// import { grey } from '@material-ui/core/colors';
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
                this.setState({ user: res.data })
            }).catch(err => {
                console.log(err)
            });
    }

    getEventsUserAttends = () => {
        API.findEventsForUser(this.state.userId)
            .then(res => {
                this.setState({ events: res.data })
            })
            .catch(err => console.log(err))
    }

    /**
     * Delete event
     */
    onDelete = (id) => {
        API.deleteEvent(id)
            .then(response => {
                console.log(response);
                const updatedUserEvents = this.state.events.filter(userEvent => {
                    return userEvent.event_id._id !== response.data._id
                })
                this.setState({ events: updatedUserEvents })
            }).catch(err => console.log(err));
    }

    /**
     * Render UserEvent card
     */
    // renderUserEventCard = (userEvent) => {
    //     return (
    //         <UserEventCard
    //             title={userEvent.event_id.title}
    //             description={userEvent.event_id.description}
    //             date={userEvent.event_id.date}
    //             key={userEvent._id}
    //             id={userEvent.event_id._id}
    //             onDelete={() => this.onDelete(userEvent.event_id._id)}
    //         />
    //     )
    // }

    render() {
        return (
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
                                    <Grid style={{paddingBottom: '1rem'}} container direction="row" justify="center" alignItems="center">
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
                    
                        {/* <Grid item md={12} container direction="row" justify="center" alignItems="center">
                            <createEventBtn />
                    </Grid> */}
                </div>
                <Row style={{marginBottom: '5rem'}}>
                    <Col md={2} />
                    <Col md={4} style={{marginTop: '5rem'}}>
                        <h2 style={{textAlign: 'center'}}>Events You Created</h2>
                        {
                            this.state.events.map(userEvent => (
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
                    <Col md={4} style={{marginTop: '5rem'}} id="attending">
                        <h2 style={{textAlign: 'center'}}>Events You Are Attending</h2>
                        {
                            this.state.events.map(userEvent => (
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
        )
    }
}

export default UserProfile;

