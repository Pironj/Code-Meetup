import React from "react";
import API from "../utils/API";
import { AttendBtn } from "../components/btn";
import CommentBox from "../components/commentbox";
import FullEvent from "../components/fullEvent"
import FooterComponent from "../components/footer";
import Axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";



class EventDetailsPage extends React.Component {
  state = {
    event: {},
    eventId: ''
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
    API.findEventById(this.state.eventId)
      .then(data => {
        console.log(data.data)
        this.setState({
          event: data.data
        })
      })
      .catch(err => console.log(err))
  }

  renderFullEvent = () => {
    return (
      <FullEvent
        title={this.state.event.title}
        description={this.state.event.description}
        key={this.state.event._id}
        creator={this.state.event.creator.first_name}
        latitude={this.state.event.location.coordinates[0]}
        longitude={this.state.event.location.coordinates[1]}
      />
    )
  }

  render() {

    return (
      <div>
        <Container>
          <Row style={{ marginTop: '2rem' }}>
            <Col>
              {this.state.event._id ? this.renderFullEvent() : <p>This event does not exist</p>}
            </Col>
            <Col>

            </Col>
          </Row>
          <Row >
          </Row>

          <Row style={{ marginTop: '1rem', marginLeft: '.5rem' }}>
            {/* <CommentBox /> */}
            <Button onClick={this.onDelete} variant="dark">Delete</Button>
          </Row>
        </Container>

      </div>
    )
  }
}

export default EventDetailsPage;