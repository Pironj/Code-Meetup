import React from 'react';
import { Jumbotron, } from 'react-bootstrap';
import { AttendBtn } from '../btn';
import Moment from "react-moment";

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
      <Moment>
      <p>Time:{props.date}</p>
      </Moment>
     
      


    </Jumbotron>

  )

}

export default FullEvent;