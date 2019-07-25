import React from "react";
import API from "../utils/API";
import FullEvent from "../components/fullEvent";
import axios from "axios";
import {Jumbotron, Button, Container, Row, Col} from "react-bootstrap";
import { CreateBtn } from "../components/btn";

class CreateEvent extends React.Component {
  state = {
    creator: '5d38f663f1fa3633a0109f70',
    title: '',
    description: '',
    // date: '',
};

  createEvent(newEvent) {
    console.log(newEvent)
  }

  onSubmit(e) {
    e.preventDefault();
   const newEvent = {
     creator: this.refs.creator.value,
     title: this.refs.title.value,
     description: this.refs.description.value,
    //  date: this.refs.date.value

   }

   API.createEvent(newEvent)
   .then(response => {
   
    const eventId = response.data._id
    this.props.history.push('/events/' + eventId)
   })

 
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveEvent({
        title: this.state.title,
        author: this.state.description,
        creator: this.state.creator
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  
 render() {
    return (
      <Container fluid>
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
              <TextArea
                value={this.state.date}
                onChange={this.handleInputChange}
                name="date"
                placeholder="Date"
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
            <Jumbotron>
              <h1>My Events</h1>
            </Jumbotron>
            {this.state.events.length ? (
              <List>
                {this.state.events.map(event => (
                  <ListItem key={eventNames._id}>
                    <Link to={"/events/" + event._id}>
                      <strong>
                        {event.title} by {event.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteEvent(event._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}


export default CreateEvent;