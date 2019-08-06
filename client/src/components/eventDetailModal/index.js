// import React from 'react';
// import { Modal, Button, ButtonToolbar } from "react-bootstrap";
// import Moment from "react-moment";

// const EventDetailModal = (props) => {

//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           {props.eventTitle}
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p>
//           {props.eventContent}
//           <Moment>{props.eventDate}</Moment>
//         </p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="dark" onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// //Modal that shows event details

// function App(props) {
//   const [modalShow, setModalShow] = React.useState(false);
//   return (
//     <ButtonToolbar>
//       <Button variant="dark" onClick={() => setModalShow(true)}>
//         Details
//         </Button>

//       <EventDetailModal
//         eventTitle={props.eventTitle}
//         eventContent={props.eventContent}
//         eventDate={props.eventDate}
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </ButtonToolbar>
//   );
// }



// export default App; 