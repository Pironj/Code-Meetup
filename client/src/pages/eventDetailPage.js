import React from "react";
import API from "../utils/API";
import { AttendBtn } from "../components/btn";
import CommentBox from "../components/commentbox";
import FullEvent from "../components/fullEvent"
import FooterComponent from "../components/footer";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link as RouterLink } from 'react-router-dom';
import GoogleApiWrapper from '../components/googleMaps'

import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  return {
    id: state.authState.id,
    first_name: state.authState.first_name,
    last_name: state.authState.last_name,
    email: state.authState.email,
    token: state.authState.token,
  };
}


class EventDetailsPage extends React.Component {
  state = {
    event: {},
    eventId: '',
    userId: '',
    comments: []
  }

  componentWillMount() {
    this.setState({
      eventId: this.props.match.params.id,
      userId: this.props.id,
    });
  }

  onAttend = () => {
    API.createUserEvent(
      {
        event_id: this.state.eventId,
        user_id: this.state.userId
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err.response));
  }

  componentDidMount() {
    API.findEventById(this.state.eventId)
      .then(data => {
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
        id={this.state.event._id}
        date={this.state.event.date}
        creator={(this.state.event.hasOwnProperty("creator") ? this.state.event.creator.first_name : "")}
        address={this.state.event.street_address}
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
              {
                this.state.event._id ? (
                  <GoogleApiWrapper
                    key={this.state.event._id}
                    latitude={this.state.event.location.coordinates[1]}
                    longitude={this.state.event.location.coordinates[0]}
                  />
                ) : <p>Loading map...</p>
              }

            </Col>
          </Row>
          <Row >
          </Row>

          {/* <Row style={{ marginTop: '.5rem', marginLeft: '.5rem', marginBottom: '2rem' }}>
            {/* <CommentBox /> */}
          <Button onClick={this.onAttend} variant="dark">Attend</Button>


          {/* </Row> */}

          <Row style={{ marginTop: '2rem', marginLeft: '.5rem' }}>

          </Row>
          <CommentBox
          eventId={this.state.eventId}
           />

        </Container>

      </div>
    )
  }
}

export default connect(mapStateToProps)(EventDetailsPage);