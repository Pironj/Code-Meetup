import React from "react";
import UserAvatar from "../components/useravatar";
import UserCard from "../components/usercard";
import API from "../utils/API";
//import Btn from "../components/btn";
import Nav from "../components/Nav";
import EventCard from "../components/eventcard";


class UserProfile extends React.Component {
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
      
        <div className = "container-fluid">
          <Nav/>
          <div className = "row"> 
            <UserAvatar>
              {this.state.user._id}  
            </UserAvatar>  
          </div>
          <div className = "row">
            <UserCard/>
          </div>

        </div>


          
    }