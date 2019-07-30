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
  
 

  componentDidMount() {
    console.log(this.props.match.params);
    this.editEvent(this.props.match.params.id);
    // this.getEventDetails();
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

  editEvent(id) {
    console.log(this.state.id);
    axios.request({
      method:'GET',
      url: `http://localhost:3000/api/events/${id}`,
    })
    .then(response => {
      // this.props.history.push('/utils/API')
      this.setState({
          title: response.data.title,
          creator: response.data.creator.first_name + " " + response.data.creator.last_name,
          description: response.data.description,
          date: response.data.date,
      }) 
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