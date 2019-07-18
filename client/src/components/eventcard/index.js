import React from 'react';
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
        <div className="eventCard">
          <div className="eventCard-inner">
            <div className="eventCard-front">
              <div className="card-header">Event you might be interested in..</div>
              <div className="card-body text-dark">
                <h5 className="card-title">{props.eventCard__title}</h5>
                <img src="imgs/terchplaceholderpic.jpeg" alt="tech pic" width="auto" height="auto">
                <p id="eventCard__text" className="card-text">{props.eventCard__content}</p>
              </div>
            </div>

            <div className="eventCard-back">
              <button id="attendBtn" type="button" className="btn btn-primary">Attend</button>
            </div>
          </div>
        </div>
  );

}
 
export default eventCard;