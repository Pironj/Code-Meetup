import React from 'react';
import './style.css';
import {Card, Button} from 'react-bootstrap';
import {EditEventBtn, DeleteBtn, AttendBtn,} from '../btn';
import { PromiseProvider } from 'mongoose';


const EventCard = (props) => {
  const editHandler = (id) => {
    props.editEvent(props.id)
    props.deleteEvent(props.id)
    props.attendEvent(props.id)
  };

  return (

        <Card className="eventCard" border="dark" style={{ width: '18rem' }}>
    <Card.Header>Popular Events</Card.Header>
    <Card.Body>
      <Card.Title>{props.eventTitle}</Card.Title>
      <Card.Text>
       {props.eventContent}}
      </Card.Text>
      {/* <EditEventBtn editEvent = {props.editEvent}
                    id = {props.id} />
      <DeleteBtn deleteEvent = {props.deleteEvent}
                    id = {props.id}
      /> */}
      <AttendBtn attendEvent = {props.attendEvent}
                    id = {props.id}
      />
    </Card.Body>
  </Card>
  );
  }

 
export default EventCard;