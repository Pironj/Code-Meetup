import React from 'react';
import { Jumbotron,} from 'react-bootstrap';
import {AttendBtn} from '../btn';

const FullEvent = (props) => {
  const editHandler = (id) => {
  
};

return (
  <Jumbotron className="fullEvent">
  <p>Title: {props.eventTitle}</p>
  <p>Description: {props.eventDescription}</p>
  <p>Location: {props.eventLocation}</p>
  <p>Host: {props.eventHost}</p>
  <p>Attendees: </p>

  {/* <AttendBtn attendEvent = {props.attendEvent}
              id = {props.id} s */}
  
  </Jumbotron>
)

}

export default FullEvent;