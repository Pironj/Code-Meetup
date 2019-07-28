import React from 'react';
import './style.css';
import {Link} from 'react-router-dom';
import {Card, Button, Container} from 'react-bootstrap';
import {EditEventBtn, DeleteBtn, AttendBtn} from '../btn';
import App from "../eventDetailModal";
import { PromiseProvider } from 'mongoose';
import Moment from "react-moment";


const EventCard = (props) => {
  const editHandler = (id) => {
    // props.editEvent(props.id)
    // props.deleteEvent(props.id)
    // props.attendEvent(props.id)
  };
  // console.log("event card props");

  // console.log(props)
  const calendarStrings = {
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: '[last] dddd [at] LT',
    nextWeek: 'dddd [at] LT',
    sameElse: 'L'
  };
  //const dateToFormat = (props);




  return (

    <div>
      <Card className="eventCard" border="dark" style={{ width: '18rem' }}>
        <Card.Header>Popular Events</Card.Header>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            {props.description}
          </Card.Text>
          <Card.Text>
            <Moment calendar={calendarStrings}>{props.date}</Moment>
          </Card.Text>
          <Link to={`/events/${props.id}`} variant="dark">Details</Link>
          {/* <App 
      <Container>
        <Card className="eventCard" border="dark" style={{ width: '20rem', height: '100%', marginTop: '3rem'}}>
    <Card.Header>Popular Events</Card.Header>
    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      <Card.Text>
       {props.description.substring(0,100) + "..."}
      </Card.Text>
      <Link to={`/events/${props.id}`} variant="dark">Details</Link>
    {/* <App 
      eventTitle={props.eventTitle}
      eventContent={props.eventContent}
    />
    {/* <EditEventBtn editEvent = {props.editEvent}
                    id = {props.id} />
    <DeleteBtn deleteEvent = {props.deleteEvent}
                    id = {props.id} /> 
    <AttendBtn attendEvent = {props.attendEvent}
                    id = {props.id} /> */}
    </Card.Body>
  </Card>
  {/* </Container> */}
    </div>
  );
}


export default EventCard;