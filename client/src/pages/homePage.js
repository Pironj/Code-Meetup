import React from "react";
import API from "../utils/API";
import {AttendBtn} from "../components/btn";
import Navigation from "../components/Nav";
import EventCard from "../components/eventcard";
import FooterComponent from "../components/footer";
import Axios from "axios";
import {Jumbotron, Container, Row, Col} from "react-bootstrap";

class HomePage extends React.Component {
  state = {
    events: [],

  }

  componentDidMount() {
    Axios.get('/api/events')
    .then(res=>{
      console.log(res.data);
      this.setState({events:res.data})})
    .catch(err=>console.log(err))
  }

  renderEventCards = () => {
    this.state.events.map(event=>(<EventCard eventTitle={event.title} eventContent={event.description} key={event._id} />))
  }

  attendEvent = (id) => {
    console.log(id);
    
  }


  render() {

    return (
      <div>
      <div>
        <Navigation />
              <Jumbotron fluid>
          <Container className="jumbotron">
            <h1>
            <span>&#60;</span>
             rendezvous 
             <span>&#8725;</span>
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
    {this.state.events.map(event=>(<EventCard id={event._id[0]} attendEvent={this.attendEvent} eventTitle={event.title} eventContent={event.description} key={event._id} />))}
    {/* <AttendBtn /> */}
    </Col>
    <Col>
    {/* {this.state.events.map(event=>(<EventCard id={event._id} attendEvent={this.attendEvent} eventTitle={event.title} eventContent={event.description} key={event._id} />))} */}
    </Col>
    <Col>
    {/* {this.state.events.map(event=>(<EventCard id={event._id} attendEvent={this.attendEvent} eventTitle={event.title} eventContent={event.description} key={event._id} />))} */}
    </Col>
  </Row>
   </div>
      <FooterComponent />
      </div>


    )

  }






}


export default HomePage;