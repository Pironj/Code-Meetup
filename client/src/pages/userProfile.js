import React from "react";
import SimpleCard from "../components/usercard";
import LettersAvatar from "../components/useravatar";
import API from "../utils/API";
//import Btn from "../components/btn";
import Nav from "../components/Nav";
import EventCard from "../components/eventcard";


class UserProfile extends React.Component {
    //create state
    state = {
        user: {},
        events: [],
    };

    //when this component mounts it grabs the user by their user id
    componentDidMount() {

        API.findUserById(this.props.match.params.id)
            .then(res => {
                console.log(res.data)
                this.setState({ user: res.data })
            }).catch(err => {
                console.log(err)
            });

        //and gets all the event's in the database that user created
        API.getAllUserEvents(this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({ events: res.data })
            }).catch(err => console.log(err))

        //gets all event's user has saved to attend from the db

        API.findEventsForUser(this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({ events: res.data })
            }).catch(err => console.log(err))
    };

    renderEventCards = () => {
        this.state.events.map(event => (<EventCard eventTitle={event.Title} eventContent={event.description} key={event._id} />))
    }

    render() {
        return (

            <div className="container-fluid">
                <Nav />

                <div className="row">
                    <LettersAvatar />
                </div>
                <div className="row">
                    <SimpleCard />
                </div>
                <div className="row">
                    <h3>Event's You've Created</h3>
                    <div className="col-md-8">
                        {this.state.events.map(event => (<EventCard id={event._id} eventTitle={event.title} eventContent={event.description} key={event._id} />))}
                    </div>
                    <div className="col-md-8">
                        {this.state.events.map(event => (<EventCard id={event._id} eventTitle={event.title} eventContent={event.description} key={event._id} />))}
                    </div>
                    <div className="col-md-8">
                        {this.state.events.map(event => (<EventCard id={event._id} eventTitle={event.title} eventContent={event.description} key={event._id} />))}
                    </div>

                </div>

                <div className="row">
                    <h3>Event's You're Attending</h3>
                    <div className="col-md-8">
                        {this.state.events.map(event => (<EventCard id={event._id} eventTitle={event.title} eventContent={event.description} key={event._id} />))}
                    </div>
                    <div className="col-md-8">
                        {this.state.events.map(event => (<EventCard id={event._id} eventTitle={event.title} eventContent={event.description} key={event._id} />))}
                    </div>
                    <div className="col-md-8">
                        {this.state.events.map(event => (<EventCard id={event._id} eventTitle={event.title} eventContent={event.description} key={event._id} />))}
                    </div>
                </div>

            </div>
        )   
    }    
}

export default UserProfile;
