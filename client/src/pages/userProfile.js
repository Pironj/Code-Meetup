import React from "react";
import SimpleCard from "../components/usercard";
import LettersAvatar from "../components/useravatar";
import API from "../utils/API";
import EventCard from "../components/eventcard";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { DeleteBtn, createEventBtn, EditEventBtn, cancelBtn } from "../components/btn";

const useStyles = makeStyles({
    container: {

        backgroundColor: grey[400]
    }
});


class UserProfile extends React.Component {

    //create state
    state = {
        user: {},
        events: [],
    };

    //when this component mounts it grabs the user by their user id
    componentDidMount() {
        

        API.findUserById(this.props.match.params.id)
            .then(res => {
                console.log(res.data)
                this.setState({ user: res.data })
            }).catch(err => {
                console.log(err)
            });

        //and gets all the event's in the database that user created
        API.getAllUserEvents(this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({ events: res.data })
            }).catch(err => console.log(err))

        //gets all event's user has saved to attend from the db

        API.findEventsForUser(this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({ events: res.data })
            }).catch(err => console.log(err))
            
            
    };

    renderEventCards = () => {
        this.state.events.map(event => (<EventCard eventTitle={event.Title} eventContent={event.description} key={event._id} />))
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
                <Grid style={{marginTop: '5rem', marginBottom: '5rem'}} item md={12} container direction="row" justify="center" alignItems="center">
                    <h3>Event's You've Created</h3>
                    <Grid item md={12} container direction="row" justify="center" alignItems="center">

                        <div>
                            <Grid container direction="column" justify="center" alignItems="center">
                                {this.state.events.map(event => (<EventCard id={event._id} eventTitle={event.title} eventContent={event.description} key={event._id} editEvent = {this.handleEditEvent} deleteEvent = {this.handleDeleteEvent} />))}
                                
                            </Grid>
                        </div>
                        <div>
                            <Grid container direction="column" justify="center" alignItems="center">
                                {this.state.events.map(event => (<EventCard id={event._id} eventTitle={event.title} eventContent={event.description} key={event._id} editEvent = {this.handleEditEvent} deleteEvent = {this.handleDeleteEvent} />))}
                                
                            </Grid>
                        </div>
                        <div>
                            <Grid container direction="column" justify="center" alignItems="center">
                                {this.state.events.map(event => (<EventCard id={event._id} eventTitle={event.title} eventContent={event.description} key={event._id} editEvent = {this.handleEditEvent} deleteEvent = {this.handleDeleteEvent}/>))}
                           
                            </Grid>
                        </div>
                    </Grid>
                </Grid>


                <Grid item md={12} container direction="row" justify="center" alignItems="center">
                    <h3>Event's You're Attending</h3>
                    <Grid item md={12} container direction="row" justify="center" alignItems="center"> 
                        <div>
                            <Grid container direction="column" justify="center" alignItems="center" >
                                {this.state.events.map(event => (<EventCard id={event._id} eventTitle={event.title} eventContent={event.description} key={event._id} />))}
                                <cancelBtn />
                            </Grid>
                        </div>
                        <div>
                            <Grid container direction="column" justify="center" alignItems="center">
                                {this.state.events.map(event => (<EventCard id={event._id} eventTitle={event.title} eventContent={event.description} key={event._id} />))}
                                <cancelBtn />
                            </Grid>
                        </div>
                        <div>
                            <Grid container direction="column" justify="center" alignItems="center">
                                {this.state.events.map(event => (<EventCard id={event._id} eventTitle={event.title} eventContent={event.description} key={event._id} />))}
                                <cancelBtn />
                            </Grid>
                        </div>
                    </Grid>    
                </Grid>


            </div>



        )
    }
}

export default UserProfile;
