import React from "react";
import API from "../utils/API";
import {AttendBtn} from "../components/btn";
import CommentBox from "../components/commentbox";
import FullEvent from "../components/fullEvent"
import FooterComponent from "../components/footer";
import Axios from "axios";
import {Container, Row, Col, Button} from "react-bootstrap";



class EventDetailsPage extends React.Component {
  state = {
    events: []
  }

    onDelete = (props) => {
    let eventId = this.state.events;
    API.deleteEvent(`http://localhost:3000/api/events/${eventId}`)
    .then(response => {
      this.props.history.push('/')
    }).catch(err => console.log(err));
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

  }




  render() {

    return (
      <div>
      <Container>
      <Row style={{marginTop: '2rem'}}>
    <Col>
    <FullEvent />
    </Col>
    <Col>

    </Col>
  </Row>
      <Row > 
      </Row>

      <Row style={{marginTop: '1rem', marginLeft: '.5rem'}}> 
      {/* <CommentBox /> */}
      <Button onClick={this.onDelete()} variant="dark">Delete</Button>

      </Row>
      </Container>
      
      </div>



    )



  }



}

export default EventDetailsPage;