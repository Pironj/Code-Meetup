import React from 'react';
import { Jumbotron, } from 'react-bootstrap';
import { AttendBtn } from '../btn';
import Moment from "react-moment";
import GoogleApiWrapper from '../googleMaps';

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
    <Jumbotron style={{paddingBottom: '2rem'}} className="fullEvent">
      <p>Title: {props.title}</p>
      <p>Description: {props.description}</p>
      {/* <p>Location: {props.eventLocation}</p> */}
      <p>Address: {props.address}</p>
      <p>Host: {props.creator}</p>
      {/* <p>Attendees: </p> */}
{/* 
      <GoogleApiWrapper
        key={props.id}
        latitude={props.latitude}
        longitude={props.longitude}
      /> */}

      <p>Time: <Moment calendar={calendarStrings}>{props.date}</Moment></p>





    </Jumbotron>

  )

}

export default FullEvent;