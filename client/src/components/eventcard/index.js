import React from 'react';
import './style.css';
import {attendBtn} from '../btn';
import {Card} from 'react-bootstrap';


const EventCard = (props) => {
  const clickHandler = () => {
    props.updateSelectedEventId(props.id)
  };

  return (

        <Card border="dark" style={{ width: '18rem' }}>
    <Card.Header>Event you may be interested in</Card.Header>
    <Card.Body>
      <Card.Title>{props.eventTitle}</Card.Title>
      <Card.Text>
       {props.eventContent}}
      </Card.Text>
      <button onClick={() => props.attendEvent(props.id)}>Attend</button>
    </Card.Body>
  </Card>
  );

}
 
export default EventCard;