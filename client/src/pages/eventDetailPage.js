import React from "react";
import API from "../utils/API";
import { AttendBtn } from "../components/btn";
import CommentBox from "../components/commentbox";
import FullEvent from "../components/fullEvent"
import FooterComponent from "../components/footer";
import Axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link as RouterLink } from 'react-router-dom';






class EventDetailsPage extends React.Component {
  state = {
    event: {},
    eventId: '',
  }

  
  
 
  onDelete = (response) => {
    API.deleteEvent(this.state.eventId)
      .then(response => {
        this.props.history.push('/')
      }).catch(err => console.log(err));
  }

  componentWillMount() {
    this.setState({
      eventId: this.props.match.params.id
    });
  }

  componentDidMount() {
    API.findEventById(this.props.match.params.id)
      .then(data => {
        // console.log('We are on the events details page')
        // console.log(data.data);
        this.setState({
          event: data.data
        })
      })
      .catch(err => console.log(err))
  }

  renderFullEvent = () => {
    console.log(this.state.event);

    return (
      <FullEvent
        title={this.state.event.title}
        description={this.state.event.description}
        key={this.state.event._id}
        id={this.state.event._id}
        date={this.state.event.date}
        creator={(this.state.event.hasOwnProperty("creator") ? this.state.event.creator.first_name : "")}
        latitude={this.state.event.location.coordinates[1]}
        longitude={this.state.event.location.coordinates[0]}
      />
    )

  }

  

  render() {

    return (
      <div>
        <Container>
          <Row style={{ marginTop: '2rem' }}>
            <Col>

              {/* TODO -> Need to change this conditional */}
              {this.state.event._id ? this.renderFullEvent() : <p>This event does not exist</p>}

            </Col>
            <Col>

            </Col>
          </Row>
          <Row >
          </Row>

          <Row style={{ marginTop: '.5rem', marginLeft: '.5rem', marginBottom: '2rem' }}>
            {/* <CommentBox /> */}
            <Button onClick={this.onDelete} variant="dark">Delete</Button>
         

          </Row>

          <Row style={{ marginTop: '2rem', marginLeft: '.5rem' }}>

          </Row>
          <CommentBox />
        </Container>

      </div>
    )
  }
}

export default EventDetailsPage;