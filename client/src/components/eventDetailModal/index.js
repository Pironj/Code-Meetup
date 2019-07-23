import React from 'react';
// import './style.css';
import {Modal, Button, ButtonToolbar} from "react-bootstrap";

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
        </Modal.Footer>
      </Modal>
    );
}

  function App(props) {
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



export default App; 