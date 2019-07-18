import React from './node_modules/react';
import './style.css';

const eventCard = (props) => {
  const clickHandler = () => {
    props.updateSelectedEventId(props.id)
  };

  return (
    <div
      className="eventCard__wrap"
      onClick={clickHandler}
    >
      <Card border="dark" style={{ width: '18rem' }}>
    <Card.Header>Events near you</Card.Header>
    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      <Card.Text>
       {props.body}
      </Card.Text>
    </Card.Body>
  </Card>
    </div>
  );

  // <div class="row">
  // <div class="col-md-4">
  //   <div class="eventCard">
  //     <div class="eventCard-inner">
  //       <div class="eventCard-front">
  //         <div class="card-header">Event you might be interested in..</div>
  //         <div class="card-body text-dark">
  //           <h5 class="card-title">CSS meetup</h5>
  //           <img src="imgs/terchplaceholderpic.jpeg" alt="tech pic" width="auto" height="auto">
  //           <p id="eventCard__text" class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  //             eiusmod tempor incididunt ut
  //             labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
  //             ut
  //             aliquip ex ea commodo consequat.</p>
  //         </div>
  //       </div>

  //       <div class="eventCard-back">
  //         <button id="attendBtn" type="button" class="btn btn-primary">Attend</button>
  //       </div>
  //     </div>
  //   </div>
  // </div>
}
 
export default eventCard;