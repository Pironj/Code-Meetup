import React from "react";
import API from '../utils/API';
import App from "../components/eventDetailModal";
import EventCard from "../components/eventcard";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";

class HomePage extends React.Component {
  state = {
    events: [],
  }

  componentDidMount() {
    API.findAllEvents()
      .then(res => {
        //  console.log(res.data);
        this.setState({ events: res.data })
      })
      .catch(err => console.log(err))
  }

  renderEventDetailModalInfo() {
    this.state.events.map(details => (
      <App
        eventTitle={details.title}
        eventContent={details.description}
        eventDate = {details.date}
        key={details._id}
      />
    ))
  }

  renderEventCards = () => {
    return this.state.events.map(event => (
      <EventCard
        title={event.title}
        description={event.description}
        date={event.date}
        key={event._id}
        id={event._id}
        creator={event.creator}
      />
    ))
  }

  attendEvent = (id) => {
    // console.log(id);

  }

  render() {

    return (
      <div>
        <div>
          <Jumbotron className="jumbotron__homepage" fluid>
            <Container className="jumbotron__homepage">
              <h1>
                <span>&#60;</span>
                rendezvous
             <span> &#8725;</span>
                <span>&#62;</span></h1>
              <p>
                A meet up app where you create events to network and code!
            </p>
            </Container>
          </Jumbotron>
        </div>
        <div>
          <Row>
            <Col>
              {this.renderEventCards()}
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}


export default HomePage;