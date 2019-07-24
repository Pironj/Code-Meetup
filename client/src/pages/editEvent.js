import React from "react";
import API from "../utils/API";
import FullEvent from "../components/fullEvent";
import FooterComponent from "../components/footer";
import axios from "axios";
import {Jumbotron, Container, Row, Col} from "react-bootstrap";
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

        <h1>Edit Event</h1>
        <form onSubmit={this.onSubmit.bind(this)}>

        <div className="input-field">
            <input type="text" name="creator" ref="creator" value={this.state.creator} 
                    onChange={this.handleInputChange.bind(this)} />
            <label htmlFor="name">Creator</label>
          </div>

          <div className="input-field">
            <input type="text" name="title" ref="title" value={this.state.title}
                  onChange={this.handleInputChange.bind(this)} />
            />
            <label htmlFor="name">Title</label>
          </div>

          <div className="input-field">
            <input type="text" name="description" ref="description" value={this.state.description}
                  onChange={this.handleInputChange.bind(this)} />
            />
            <label htmlFor="name">Description</label>
          </div>

          <div className="input-field">
            <input type="text" name="date" ref="date" value={this.state.date}
                  onChange={this.handleInputChange.bind(this)} />
            />
            <label htmlFor="name">Date</label>
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>


    )
  }
  }



export default EditEvent;