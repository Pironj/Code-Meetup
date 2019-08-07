import React from "react";
import API from '../utils/API';
import EventCard from "../components/eventcard";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";
import "./style.css";
import { textAlign } from "@material-ui/system";

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
            {/* <a href="https://fontmeme.com/fonts/dystopian-future-font/"><img src="https://fontmeme.com/permalink/190806/ad71f4b6a60c7a3e01444c7601f8d78d.png" alt="dystopian-future-font" border="0"/></a>               */}
            <h1 className="brand" style={{color: 'white', marginTop: '3rem', fontSize: '4rem'}}>
                <span>&#60;</span>
                rendezvous
                <span> &#8725;</span>
                <span>&#62;</span>
              </h1>
              {/* <p className="brand" id="desc"> */}
              {/* <a href="https://fontmeme.com/fonts/dystopian-future-font/"><img src="https://fontmeme.com/permalink/190806/924bfc3a28aa3825234a2dca46d1eaec.png" alt="dystopian-future-font" border="0"/></a>              </p> */}
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