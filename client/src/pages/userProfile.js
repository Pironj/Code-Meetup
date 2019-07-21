import React from "react";
import API from "../utils/API";
import Btn from "../components/btn";
import Nav from "../components/Nav";
import EventCard from "../components/eventcard";
import Axios from "axios";
import { Col, Row, Container } from "../components/Grid";

class UserProfile extends React.Component{
    //create state
    state = {
        user:{},
        events: [],
    };

    //when this component mounts it grabs the user by their user id
    componentDidMount() {
        API.findUserById(this.props.match.params.id)
        .then(res => {
          console.log(res.data)
          this.setState({user: res.data})
        }).catch(err => {
          console.log(err)
        });

        //and gets all the event's in the database that user created
       API.getAllUserEvents(this.props.match.params.id)
        .then(res =>{
            console.log(res.data);
            this.setState({events:res.data})
        }).catch(err=>console.log(err))

        //gets all event's user has saved to attend from the db

        API.findEventsForUser(this.props.match.params.id)
        .then(res => {
            console.log(res.data);
            this.setState({events:res.data})
        }).catch(err=>console.log(err))
    };

    renderEventCards = () => {
        this.state.events.map(event => (<EventCard eventTitle={event.Title} eventContent={event.description} key={event._id}/>))
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size = ""></Col>
                </Row>
            </Container>
        )
    }

}