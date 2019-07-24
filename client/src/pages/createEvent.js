import React from "react";
import API from "../utils/API";
import FullEvent from "../components/fullEvent";
import FooterComponent from "../components/footer";
import axios from "axios";
import {Jumbotron, Container, Row, Col} from "react-bootstrap";
import { CreateBtn } from "../components/btn";

class CreateEvent extends React.Component {
  createEvent(newEvent) {
    console.log(newEvent)
  }

  onSubmit(e) {
    e.preventDefault();
   const newEvent = {
     creator: this.refs.creator.value,
     title: this.refs.title.value,
     description: this.refs.description.value,
     date: this.refs.date.value
   }

   console.log(newEvent);

   e.preventDefault();
   this.createEvent(newEvent);
  }

  

  createEvent(newEvent) {
    API.createEvent(newEvent)
    .then(response => {
      this.props.history.push('/utils/API')
      console.log(response)
    }).catch(err => console.log(err));
  }

  
  render() {
    
    return (
   
      <div>

        <h1>Create New Event</h1>
        <form onSubmit={this.onSubmit.bind(this)}>

        <div className="input-field">
            <input type="text" name="creator" ref="creator" />
            <label htmlFor="name">Creator</label>
          </div>

          <div className="input-field">
            <input type="text" name="title" ref="title" />
            <label htmlFor="name">Title</label>
          </div>

          <div className="input-field">
            <input type="text" name="description" ref="description" />
            <label htmlFor="name">Description</label>
          </div>

          <div className="input-field">
            <input type="text" name="date" ref="date" />
            <label htmlFor="name">Date</label>
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>


    )
  }
  }



export default CreateEvent;