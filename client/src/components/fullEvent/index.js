import React from 'react';
import { Jumbotron, } from 'react-bootstrap';
import { AttendBtn } from '../btn';
import Moment from "react-moment";

const FullEvent = (props) => {
  const editHandler = (id) => {

    

  };
  const calendarStrings = {
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: '[last] dddd [at] LT',
    nextWeek: 'dddd [at] LT',
    sameElse: 'L'
  };

  return (
    <Jumbotron className="fullEvent">
      <p>Title: {props.title}</p>
      <p>Description: {props.description}</p>
      {/* <p>Location: {props.eventLocation}</p> */}
      <p>Host: {props.creator}</p>
      {/* <p>Attendees: </p> */}
      
      <p>Time: <Moment calendar={calendarStrings}>{props.date}</Moment></p>
      
     
      


    </Jumbotron>

  )

}

export default FullEvent;