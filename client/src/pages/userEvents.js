import React, {Component} from 'react';
import API from "../utils/API";
import EventCard from "../components/eventcard";


class UserEvents extends Component {

  state = {
    events: [],
    success: false

  }

  componentDidMount() {
    API.getAllUserEvents()
      .then(data => {console.log(data
        )
          this.setState({
            events: data.data
          })
      })
      .catch (err => console.log(err))

  };

  handleAttendEvent = (id) => {
    console.log(id);
    this.setState({
      sucess: true,
    })
  }

  handleDeleteEvent = (id) => {
    console.log(id);
   
  }

  handleEditEvent = (id) => {
    console.log(id);
   
  }
   renderEvents = () => {
    const {events} = this.state;
    return events.map(event => (
    
      <EventCard
        key = {event._id}
        id = {event._id}
        eventTitle = {event.createdAt}
        eventContent = {event.createdAt}
        attendEvent = {this.handleAttendEvent}
        deleteEvent = {this.handleDeleteEvent}
        editEvent = {this.handleEditEvent}
      />
    ))

   }
  render() {
    return (
      <div>

      <h1> This is User Events</h1>
      {this.state.success ? <p>Event Added</p> : null }
      {this.renderEvents()}

      </div>
    )
  }
};

export default UserEvents;