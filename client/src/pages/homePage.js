import React from 'react';
import API from '../utils/API';
import EventCard from '../components/eventcard';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import './style.css';


class HomePage extends React.Component {

  state = {
    events: [],
  }

  componentDidMount() {
    API.findAllEvents()
      .then(res => {
        this.setState({ events: res.data });
      })
      .catch(err => console.log(err));
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
        // use for month/day/time am/pm format
        format={event.dateFormatted}
      />
    ));
  }

  render() {

    return (
      <div>
        <div>
          <Jumbotron className="jumbotron__homepage" fluid>
            <Container id="bannerText">
              {/* <a href="https://fontmeme.com/fonts/dystopian-future-font/"><img src="https://fontmeme.com/permalink/190806/ad71f4b6a60c7a3e01444c7601f8d78d.png" alt="dystopian-future-font" border="0"/></a>               */}
              {/* <h1 className="brand" style={{color: 'white', marginTop: '3rem', fontSize: '4rem'}}>
            <img src="https://fontmeme.com/permalink/190807/6aadb61abb6dff195b588f6482f2ac8c.png" alt="avayx-font" border="0"/>            */}
              <h1 className="brand" style={{color: 'white', marginTop: '4.5rem', fontSize: '8vw'}}>
                <div id="title">
                  <span>&#60;</span>
                rendezvous
                  <span> &#8725;</span>
                  <span>&#62;</span>
                </div>
              </h1>
              <h3 id="titleDesc" style={{fontSize: '3.3vw', marginTop: '.6rem'}}>A meet up application where you can create events to network and code.</h3>
              {/* <p className="brand" id="desc"> */}
              {/* <a href="https://fontmeme.com/fonts/dystopian-future-font/"><img src="https://fontmeme.com/permalink/190806/924bfc3a28aa3825234a2dca46d1eaec.png" alt="dystopian-future-font" border="0"/></a>              </p> */}
              {/* </h1>
              <p className="brand" id="desc">
              <img src="https://fontmeme.com/permalink/190807/75ad7431bbb8a02c82d3aa34a4436fc7.png" alt="planet-n-compact-font" border="0"/>
              </p> */}
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
    );
  }
}


export default HomePage;