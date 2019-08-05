import React from "react";
import API from "../utils/API";
import CommentBox from "../components/commentbox";
import FullEvent from "../components/fullEvent"
import FooterComponent from "../components/footer";
import Axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";



class UserEvents extends React.Component {
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

    return (<FullEvent
      title={this.state.event.title}
      description={this.state.event.description}
      key={this.state.event._id}
      creator={(this.state.event.hasOwnProperty("creator") ? this.state.event.creator.first_name : "")}
    />
    )
  
  }

  render() {

    return (
      <div>
        <Container>
          <Row style={{ marginTop: '2rem' }}>
            <Col> 
              {this.state.event ? this.renderFullEvent() : <p>This event does not exist</p>}
            </Col>
            <Col>

            </Col>
          </Row>
          <Row >
          </Row>

          <Row style={{ marginTop: '1rem', marginLeft: '.5rem' }}>
            {/* <CommentBox /> */}
            <Button onClick={this.onDelete} variant="dark">Delete</Button>
            <Button onClick={this.onEdit} variant="dark">Edit</Button>

          </Row>
        </Container>

      </div>
    )
  }
}

export default UserEvents;