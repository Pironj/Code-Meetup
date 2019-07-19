import React from "react";
import API from "../utils/API";
import Btn from "../components/btn";
import EventCard from "../components/eventcard";
import Axios from "axios";

class HomePage extends React.Component {
  state = {
    events: [],
    // selectedEventId: '',

  }

  componentDidMount() {
    Axios.get('/api/events')
    .then(res=>{
      console.log(res.data);
      this.setState({events:res.data})})
    .catch(err=>console.log(err))
  }

  renderEventCards = () => {
    this.state.events.map(event=>(<EventCard eventTitle={event.title} eventContent={event.description} key={event._id} />))
  }

  attendEvent = (id) => {
    console.log(id);
    
  }


  render() {

    return (
      <div>
      <h1> This is home page.</h1>
      <div>
      <p>Hello World</p>
      </div>
      <div>
      <p>Events cards</p>
      {this.state.events.map(event=>(<EventCard id={event._id} attendEvent={this.attendEvent} eventTitle={event.title} eventContent={event.description} key={event._id} />))}
      </div>
      </div>


    )

  }






}


export default HomePage;