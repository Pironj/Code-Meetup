import React from 'react';
import { Jumbotron, } from 'react-bootstrap';
import Moment from "react-moment";
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';


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
    <Jumbotron style={{ paddingBottom: '2rem', backgroundColor: 'white' }} className="fullEvent">
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <p>Address: {props.address}</p>
      <p>Host: {props.creator}</p>

      <p>Time: <Moment format = "MM/DD/YYYY HH:mm" calendar={calendarStrings}>{props.date}</Moment></p>

    	<ThumbUpOutlinedIcon 
      style={{marginLeft: '28rem'}}

      />

    </Jumbotron>

  )

}

export default FullEvent;