import React from 'react';
import axios from 'axios';
import {Modal, Button, ButtonToolbar} from "react-bootstrap";


//Function to delete specific event ID in DB
const onDelete = (props) => {
  let eventId = this.state.events;
  axios.delete(`http://localhost:3000/api/events/${eventId}`)
  .then(response => {
    this.props.history.push('/')
  }).catch(err => console.log(err));

  
}


const EventDetailModal = (props) => {
    // console.log("creating event detail modal")
    // console.log(props);
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.eventTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          {props.eventContent}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={props.onHide}>Close</Button>
          <Button variant="dark" onClick={props.onDelete()}>Delete</Button>

        </Modal.Footer>
      </Modal>
    );
}
// Modal pops up for user to view details

  function DeleteModal(props) {
    console.log("in app");
    console.log(props)
    const [modalShow, setModalShow] = React.useState(false);
    return (
      <ButtonToolbar>
        <Button variant="dark" onClick={() => setModalShow(true)}>
          Details
        </Button>
  
        <EventDetailModal
          eventTitle={props.eventTitle}
          eventContent={props.eventContent}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </ButtonToolbar>
    );
  }



export default DeleteModal; 