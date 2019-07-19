import React from 'react';
import './style.css';
import {Card, Button} from 'react-bootstrap';


const EventCard = (props) => {
  const clickHandler = () => {
    props.updateSelectedEventId(props.id)
  };

  return (

        <Card className="eventCard" border="dark" style={{ width: '18rem' }}>
    <Card.Header>Popular Events</Card.Header>
    <Card.Body>
      <Card.Title>{props.eventTitle}</Card.Title>
      <Card.Text>
       {props.eventContent}}
      </Card.Text>
      <Button className="attendBtn" variant="outline-dark" onClick={() => props.attendEvent(props.id)}>Attend</Button>
    </Card.Body>
  </Card>
  );

}
 
export default EventCard;