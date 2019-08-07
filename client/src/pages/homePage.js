import React from "react";
import API from '../utils/API';
import EventCard from "../components/eventcard";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";
import "./style.css";

class HomePage extends React.Component {
  state = {
    events: [],
  }

  componentDidMount() {
    API.findAllEvents()
      .then(res => {

        this.setState({ events: res.data })
      })
      .catch(err => console.log(err))
  }


  renderEventCards = () => {

    return this.state.events.map(event => (
      <EventCard
        title={event.title}
        description={event.description}
        date={event.date}
        location={event.street_address}
        key={event._id}
        id={event._id}
        creator={event.creator}
      />
    ))
  }

  render() {

    return (
      <div>
        <div>
          <Jumbotron className="jumbotron__homepage" fluid>
            <Container id="bannerText">
            <img src="https://fontmeme.com/permalink/190807/6aadb61abb6dff195b588f6482f2ac8c.png" alt="avayx-font" border="0"/>           
            {/* <h1 className="brand">
                <span>&#60;</span>
                rendezvous
                <span> &#8725;</span>
                <span>&#62;</span>
              </h1> */}
              <p className="brand" id="desc">
              <img src="https://fontmeme.com/permalink/190807/75ad7431bbb8a02c82d3aa34a4436fc7.png" alt="planet-n-compact-font" border="0"/>
              </p>
            </Container>
          </Jumbotron>
        </div>
        <div>
          <Row style={{ marginBottom: '5rem' }}>
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