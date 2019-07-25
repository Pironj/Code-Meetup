import React from "react";
import API from "../utils/API";
import FullEvent from "../components/fullEvent";
import FooterComponent from "../components/footer";
import axios from "axios";
import {Jumbotron, Container, Row, Col, Button} from "react-bootstrap";
import { CreateBtn } from "../components/btn";

class EditEvent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      creator: '',
      description: '',
      date: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  
 

  componentWillMount() {
    this.getEventDetails();
  }

  getEventDetails() {
    API.getAllUserEvents()
      .then(response=> {
        this.setState({
          id: response.data.id,
          creator: response.data.creator,
          description: response.data.description,
          date: response.data.description,

        })
      })
      .catch (err => console.log(err))

  }

  editEvent(newEvent) {
    axios.request({
      method:'put',
      url: 'http://localhost:3000/utils/api/events/${this.state.id}',
      data: newEvent
    })
    .then(response => {
      this.props.history.push('/utils/API')
      console.log(response)
    }).catch(err => console.log(err));
  }
  onSubmit(e) {
    e.preventDefault();
   const newEvent = {
     creator: this.refs.creator.value,
     title: this.refs.title.value,
     description: this.refs.description.value,
     date: this.refs.date.value
   }
   this.editEvent(newEvent)
   e.preventDefault();
  }

  handleInputChange(e){
    const target = e.target
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  render() {
    
    return (
   
      <div>
      <Row>
      <Col>

      </Col>
      <Col xs={3}>

        <h1 style={{marginTop: '2rem'}} >Edit Event</h1>
        <form style={{marginRight: '2rem'}} onSubmit={this.onSubmit.bind(this)}>

        <div className="input-field">
            <input type="text" name="creator" ref="creator" value={this.state.creator} 
                    onChange={this.handleInputChange.bind(this)} />
            <label style={{marginLeft: '.5rem'}} htmlFor="name">Creator</label>
          </div>

          <div className="input-field">
            <input type="text" name="title" ref="title" value={this.state.title}
                  onChange={this.handleInputChange.bind(this)} />
            
            <label style={{marginLeft: '.5rem'}} htmlFor="name">Title</label>
          </div>

          <div className="input-field">
            <input type="text" name="description" ref="description" value={this.state.description}
                  onChange={this.handleInputChange.bind(this)} />
            
            <label style={{marginLeft: '.5rem'}} htmlFor="name">Description</label>
          </div>

          <div className="input-field">
            <input type="text" name="date" ref="date" value={this.state.date}
                  onChange={this.handleInputChange.bind(this)} />
          
            <label style={{marginLeft: '.5rem'}} htmlFor="name">Date</label>
          </div>
          <Button type="submit" value="Save" className="btn" variant="dark">Save</Button>
          {/* <input type="submit" value="Save" className="btn" /> */}
        </form>
      </Col>
      <Col>

      </Col>
      </Row>
      </div>


    )
  }
  }



export default EditEvent;