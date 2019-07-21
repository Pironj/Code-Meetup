import React from 'react';
import Button from 'react-bootstrap/Button';
import './style.css';

export const attendBtn = (props) => {
  const clickHandler = () => {

  }
  return (
    <div className="attendBtn"
    onClick={clickHandler}
    >
      <Button variant="dark">Primary</Button>
    </div>
  )
}

export const DeleteBtn = (props) => {
  const clickHandler = () => {


  }
  return (
      <Button variant="dark" onClick={() => props.deleteEvent(props.id)} >Delete</Button>
  )
}

export const createEventBtn = (props) => {
  const clickHandler = () => {

  }
  return (
    <div className="attendBtn"
    onClick={clickHandler}>

      <Button variant="dark"></Button>
    </div>
  )
}

export const EditEventBtn = (props) => {
  const clickHandler = () => {

  }
  return (
      <Button variant="dark" onClick={() => props.editEvent(props.id)}>Edit Event</Button>
  
  )
}

export const cancelBtn = (props) => {
  const clickHandler = () => {

  }
  return (
    <div className="attendBtn"
    onClick={clickHandler}>

      <Button variant="dark"></Button>
    </div>
  )
}

