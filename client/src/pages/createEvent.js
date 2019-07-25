import React from "react";
import API from "../utils/API";
import FullEvent from "../components/fullEvent";
import axios from "axios";
import {Jumbotron, Button, Container, Row, Col} from "react-bootstrap";
import { CreateBtn } from "../components/btn";
import { Form, Input, FormBtn, TextArea}from "../components/Form";
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";

class CreateEvent extends React.Component {
  state = {
    creator: '5d38f663f1fa3633a0109f70',
    title: '',
    description: '',
    // date: '',
};


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.description) {
      API.createEvent({
        title: this.state.title,
        description: this.state.description,
        creator: this.state.creator
      })
        .then(event => console.log(event))
        .catch(err => console.log(err));
    }
  };

  
 render() {
    return (
      <Container fluid>
      {this.state.title + this.state.description}
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Create an Event</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder=" Description (required)"
              />
              <FormBtn
                disabled={!(this.state.description  && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Event
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            {/* <Jumbotron>
              <h1>My Events</h1>
            </Jumbotron> */}
            {/* {this.state.events.length ? (
              <List>
                {this.state.events.map(event => (
                  <ListItem key={eventNames._id}>
                    <Link to={"/events/" + event._id}>
                      <strong>
                        {event.title} by {event.author}
                      </strong>
                    </Link>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )} */}
          </Col>
        </Row>
      </Container>
    );
  }
}


export default CreateEvent;