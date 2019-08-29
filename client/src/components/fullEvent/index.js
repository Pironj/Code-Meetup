import React from 'react';
import { Jumbotron, } from 'react-bootstrap';
import Moment from "react-moment";

const FullEvent = (props) => {

  const calendarStrings = {
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: '[last] dddd [at] LT',
    nextWeek: 'dddd [at] LT',
    sameElse: 'L'
  };

  //Full event details are returned to user

  return (
    <Jumbotron style={{ paddingBottom: '2rem' }} className="fullEvent">
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <p>Address: {props.address}</p>
      <p>Host: {props.creator}</p>

      <p>Time: <Moment format = "MM/DD/YYYY HH:mm" calendar={calendarStrings}>{props.date}</Moment></p>

    </Jumbotron>

  )

}

export default FullEvent;