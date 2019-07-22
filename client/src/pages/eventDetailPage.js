import React from "react";
import API from "../utils/API";
import {AttendBtn} from "../components/btn";
import CommentBox from "../components/commentbox";
import EventCard from "../components/eventcard";
import FooterComponent from "../components/footer";
import Axios from "axios";
import {Jumbotron, Container, Row, Col} from "react-bootstrap";



class EventDetailsPage extends React.Component {
  state = {
    events: []
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


  render() {

    return (
      <div>
      <div>
      <h1>Event Card Section</h1>
      <EventCard />
      </div>

      <div> 
      <CommentBox />
      </div>
      
      </div>



    )



  }



}

export default EventDetailsPage;