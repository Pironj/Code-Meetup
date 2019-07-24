import React from "react";
import API from "../utils/API";
import FullEvent from "../components/fullEvent";
import FooterComponent from "../components/footer";
import Axios from "axios";
import {Jumbotron, Container, Row, Col} from "react-bootstrap";
import { DeleteBtn } from "../components/btn";

class EditEvent extends React.Component {
  state = {
    events: [],

  }

  componentDidMount() {
    Axios.get('/api/events')
    .then(res=>{
      console.log(res.data);
      this.setState({events:res.data})})
    .catch(err=>console.log(err))
  }

  renderfullEvent = () => {
    this.state.events.map(event=>(<FullEvent eventTitle={event.title} eventContent={event.description} key={event._id} />))
  }

  attendEvent = (id) => {
    console.log(id);
    
  }


  render() {

    return (
      <div>
      <Row>
          <FullEvent/>
          <DeleteBtn/>
      </Row>
      <div>
    <FooterComponent />
   </div>
      </div>


    )

  }






}


export default EditEvent;