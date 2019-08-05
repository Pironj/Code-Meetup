import React from "react";
import SimpleCard from "../components/usercard";
import LettersAvatar from "../components/useravatar";
import API from "../utils/API";
//import Btn from "../components/btn";
import Nav from "../components/Nav";
import EventCard from "../components/eventcard";
import Grid from '@material-ui/core/Grid';


class OtherUsersProfile extends React.Component {
  //create state
  state = {
    user: {},
    events: [],
  };


  componentDidMount() {
    //when this component mounts it grabs the user by their user id

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
  };

  renderEventCards = () => {
    this.state.events.map(event => (<EventCard eventTitle={event.Title} eventContent={event.description} key={event._id} />))
  };

  render() {
    return (

      <div>

        <div>
          <Grid item md={1} container direction="column" justify="center" alignItems="center">
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
        <Grid item md={12} container direction="row" justify="center" alignItems="center">
          <h3>Created Events</h3>
          <Grid item md={12} container direction="row" justify="center" alignItems="center">
            <div>
              <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                {this.state.events.map(event => (<EventCard id={event._id} eventTitle={event.title} eventContent={event.description} key={event._id} attendEvent = {this.handleAttendEvent} />))}
                
              </Grid>
            </div>
            <div>
              <Grid container direction="column" justify="center" alignItems="center">
                {this.state.events.map(event => (<EventCard id={event._id} eventTitle={event.title} eventContent={event.description} key={event._id} attendEvent = {this.handleAttendEvent} />))}
                
              </Grid>
            </div>
            <div>
              <Grid container direction="column" justify="center" alignItems="center">
                {this.state.events.map(event => (<EventCard id={event._id} eventTitle={event.title} eventContent={event.description} key={event._id} attendEvent = {this.handleAttendEvent} />))}
                
              </Grid>
            </div>
          </Grid>
        </Grid>


      </div>


    )
  }
};

export default OtherUsersProfile;
