import React from "react";
import API from "../utils/API";
import App from "../components/eventDetailModal";
import EventCard from "../components/eventcard";
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

  renderEventDetailModalInfo() {
    this.state.events.map(details=>
      (<App 
      eventTitle={details.title}
      eventContent={details.description}
      key={details._id} />
      ))
  }

  renderEventCards = () => {
    this.state.events.map(event=>
      (<EventCard 
      title={event.title} 
      description={event.description} 
      key={event._id}
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
    {this.state.events.map(event=>
    (<EventCard id={event._id} 
      id={event._id}
      // attendEvent={this.attendEvent} 
      title={event.title} 
      description={event.description} 
      key={event._id} />))}
    </Col>
    </Row>
   </div>
      </div>


    )

  }






}


export default HomePage;