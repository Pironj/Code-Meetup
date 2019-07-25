import React from 'react';
import { Jumbotron, } from 'react-bootstrap';
import { AttendBtn } from '../btn';

const FullEvent = (props) => {
  const editHandler = (id) => {

  };

  return (
    <Jumbotron className="fullEvent">
      <p>Title: {props.title}</p>
      <p>Description: {props.description}</p>
      {/* <p>Location: {props.eventLocation}</p> */}
      <p>Host: {props.creator}</p>
      {/* <p>Attendees: </p> */}

    </Jumbotron>

  )

}

export default FullEvent;