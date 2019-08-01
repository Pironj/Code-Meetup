import React from "react";
import SimpleCard from "../components/usercard";
import LettersAvatar from "../components/useravatar";
import API from "../utils/API";
import UserEventCard from "../components/userEventCard";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { DeleteBtn, createEventBtn, EditEventBtn, cancelBtn } from "../components/btn";
import {Col, Row } from 'react-bootstrap';

const useStyles = makeStyles({
    container: {

        backgroundColor: grey[400]
    }
});




class UserProfile extends React.Component {

    //create state
    state = {
        user: {},
        userId: '',
        events: []
    };


    componentWillMount() {
        this.setState({userId: this.props.match.params.id})
    }

    //when this component mounts it grabs the user by their user id
    componentDidMount() {
        // const parseUserObj = JSON.parse(localStorage.getItem('authUser'));
        // const token = parseUserObj.token;
        // console.log('\nfindbyid token: ', token);
    

        API.findUserById(this.state.userId)
            .then(res => {
                console.log(res.data)
                this.setState({ user: res.data })
            }).catch(err => {
                console.log(err)
            });

        //and gets all the event's in the database that user created
        // API.getAllUserEvents(this.props.match.params.id)
        //     .then(res => {
        //         console.log(res.data);
        //         this.setState({ events: res.data })
        //     }).catch(err => console.log(err))

        //gets all event's user has saved to attend from the db

        API.findEventsForUser(this.state.userId)
            .then(res => {
                console.log(res.data);
                this.setState({ events: res.data })
            }).catch(err => console.log(err))
            
            
    };

        onDelete = (id) => {
        API.deleteEvent(id)
          .then(response => {
            this.props.history.push('/users/:id')
            console.log(response)
          }).catch(err => console.log(err));
      }

    renderEventCards = () => {
        this.state.events.map(event => (<UserEventCard eventTitle={event.Title} eventContent={event.description} key={event._id} />))
    }

    render() {
        return (
            <div>

                <div>
                    <Grid style={{marginTop: '2rem'}} item md={1} container direction="column" justify="center" alignItems="center">
                        <div>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <LettersAvatar />
                            </Grid>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <SimpleCard />
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
    {this.state.events.map(userEvent=>
    (<UserEventCard id={userEvent.event_id._id} 
      id={userEvent.event_id._id}
      onDelete={this.onDelete}
      // attendEvent={this.attendEvent} 
      title={userEvent.event_id.title} 
      description={userEvent.event_id.description} 
      key={userEvent.event_id._id} />))}
    </Col>
    </Row>

            </div>



        )
    }
}

export default UserProfile;
