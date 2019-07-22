import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { indigo } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import API from "../utils/API";
//import Btn from "../components/btn";
import Nav from "../components/Nav";
import EventCard from "../components/eventcard";

const useStyles = makeStyles({
  avatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: indigo[500],
  },

  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  //when this component mounts it grabs the user by their user id
  componentDidMount() {
    API.findUserById(this.props.match.params.id)
      .then(res => {
        console.log(res.data)
        this.setState({ user: res.data })
      }).catch(err => {
        console.log(err)
      });
    const classes = useStyles();

    return (
      <Card className={classes.card}>
        <CardContent>
          <Grid container justify="center" alignItems="center">
            <Avatar className={classes.avatar}>User</Avatar>
          </Grid>

          <Grid container justify="center" alignItems="center">
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Word of the Day
          </Typography>
            <Typography variant="h5" component="h2">
              Name:
          </Typography>
            <Typography variant="h5" component="h2">
              Email:
          </Typography>

          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>

      </Card>
    );
  };
};

class UserProfile extends React.Component {
    //create state
    state = {
      user: {},
      events: [],
    };

  
    componentDidMount() {
      //and gets all the event's in the database that user created
      API.getAllUserEvents(this.props.match.params.id)
        .then(res => {
          console.log(res.data);
          this.setState({ events: res.data })
        }).catch(err => console.log(err))
    };

    renderEventCards = () => {
      this.state.events.map(event => (<EventCard eventTitle={event.Title} eventContent={event.description} key={event._id} />))
    };

    render() {
      return (
      


          
    }