import React from "react";
import API from "../utils/API";
import {AttendBtn} from "../components/btn";
import CommentBox from "../components/commentbox";
import EventCard from "../components/eventcard";
import FooterComponent from "../components/footer";
import Axios from "axios";
import {Container, Row, Col} from "react-bootstrap";



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
      <Container>
      <Row style={{marginTop: '5rem'}}> 
      <EventCard />
      </Row>

      <Row style={{marginTop: '1rem'}}> 
      <CommentBox />
      </Row>
      </Container>
      <FooterComponent />
      
      </div>



    )



  }



}

export default EventDetailsPage;