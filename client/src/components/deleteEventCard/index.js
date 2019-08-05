import React from 'react';
import './style.css';
import {Card} from 'react-bootstrap';
import DeleteModal from '../deleteModal'
import App from "../eventDetailModal";
import { PromiseProvider } from 'mongoose';

//Function to delete specific event card

const DeleteEventCard = (props) => {
  const editHandler = (id) => {
    props.editEvent(props.id)
    props.deleteEvent(props.id)
    props.attendEvent(props.id)
  };
  

  return (
    <div>
        <Card className="eventCard" border="dark" style={{ width: '18rem' }}>
    <Card.Header>Popular Events</Card.Header>
    <Card.Body>
      <Card.Title>{props.eventTitle}</Card.Title>
      <Card.Text>
       {props.eventContent}
      </Card.Text>
    <DeleteModal 
      eventTitle={props.eventTitle}
      eventContent={props.eventContent}
    />
    </Card.Body>
  </Card>
    </div>
  );
}

 
export default DeleteEventCard;