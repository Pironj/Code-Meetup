import React from 'react';
import './style.css';
import {Card} from 'react-bootstrap';
import {EditEventBtn, DeleteBtn, AttendBtn} from '../btn';
import App from "../eventDetailModal";
import { PromiseProvider } from 'mongoose';


const EventCard = (props) => {
  const editHandler = (id) => {
    props.editEvent(props.id)
    props.deleteEvent(props.id)
    props.attendEvent(props.id)
  };
  // console.log("event card props");
  
  // console.log(props)

  return (
    <div>
        <Card className="eventCard" border="dark" style={{ width: '18rem' }}>
    <Card.Header>Popular Events</Card.Header>
    <Card.Body>
      <Card.Title>{props.eventTitle}</Card.Title>
      <Card.Text>
       {props.eventContent}
      </Card.Text>
    <App 
      eventTitle={props.eventTitle}
      eventContent={props.eventContent}
    />
    <EditEventBtn editEvent = {props.editEvent}
                    id = {props.id} />
    <DeleteBtn deleteEvent = {props.deleteEvent}
                    id = {props.id} /> 
    <AttendBtn attendEvent = {props.attendEvent}
                    id = {props.id} />
    </Card.Body>
  </Card>
    </div>
  );
}

 
export default EventCard;