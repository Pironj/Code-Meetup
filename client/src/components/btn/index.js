import React from 'react';
import Button from 'react-bootstrap/Button';
import './style.css';

export const AttendBtn = (props) => {
  const clickHandler = () => {

  }
  return (
    <Button variant="dark" onClick={() => props.editEvent(props.id)}>Attend</Button>
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
    <Button variant="dark" onClick={() => props.createEvent(props.id)}>Create Event</Button>

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
    <Button variant="dark" onClick={() => props.cancelEvent(props.id)}> Cancel Event</Button>

  )
}

export const viewBtn = (props) => {
  const clickHandler = () => {

  }
  return (
    <Button variant="dark" onClick={() => props.viewEvent(props.id)}> View </Button>

  )
}