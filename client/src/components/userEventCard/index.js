import React from 'react';
import './style.css';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import Fab from '@material-ui/core/Fab';
// import NavigationIcon from '@material-ui/icons/Navigation';
import { Card, Col, Row, Container } from 'react-bootstrap';
// import App from "../eventDetailModal";
// import API from '../../utils/API';
import Moment from "react-moment";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const calendarStrings = {
  lastDay: '[Yesterday at] LT',
  sameDay: '[Today at] LT',
  nextDay: '[Tomorrow at] LT',
  lastWeek: '[last] dddd [at] LT',
  nextWeek: 'dddd [at] LT',
  sameElse: 'L'
};

const UserEventCard = (props) => {
  // console.log("event props", props);
  const color = teal[500]
  const classes = useStyles();
  // const editHandler = (id) => {
  // props.editEvent(props.id)
  // props.deleteEvent(props.id)
  // props.attendEvent(props.id)
  // };


  //const dateToFormat = (props);

  //Here we are returning a User Event Card
  return (
    <div>
      {/* <Card className="eventCard" border="dark" style={{ width: '18rem' }}> */}
      <Container>
        <Card className="eventCard" border="dark" style={{ width: '20rem', height: 'auto', marginTop: '3rem' }}>
          <Card.Header>{props.title}</Card.Header>
          <Card.Body>

            <Card.Text>
              {props.description}
            </Card.Text>

            <Card.Text>
              <Moment // Moment JS used to display calendar dates
                style={{ fontWeight: 'bold' }}
                calendar={calendarStrings}>{props.date}</Moment>
              {/* <hr></hr> */}
            </Card.Text>

            {/* Detail view button */}
            <Row style={{ marginLeft: '8rem' }}>
              <Fab
                variant="extended"
                size="small"
                color="secondary"
                aria-label="add"
                component={RouterLink}
                to={`/events/${props.id}`}
                className={classes.margin}
                style={{ marginLeft: '11rem' }}
              >
                Details
              </Fab>

              {/* Edit button */}
              {
                props.onDelete ? <Fab
                  variant="extended"
                  size="small"
                  color="secondary"
                  aria-label="add"
                  component={RouterLink}
                  to={`/events/${props.id}/edit`}
                  className={classes.margin}
                >
                  Edit
                </Fab> : ''
              }

              {/* Delete button */}
              {
                props.onDelete ? (
                  <Fab
                    variant="extended"
                    size="small"
                    color="secondary"
                    aria-label="add"
                    component={RouterLink}
                    className={classes.margin}
                  >
                    Delete
                  </Fab>
                )
                  : ''
              }

              {/* <Fab
          variant="extended"
          size="small"
          color="secondary"
          aria-label="add"
          component={RouterLink}
          to={`/events/${props.id}`}
          className={classes.margin}
        >
          {/* <NavigationIcon className={classes.extendedIcon} /> */}
              {/* Details
        </Fab> */}

            </Row>


            {/* <App 
      @@ -39,6 +40,7 @@ const EventCard = (props) => {
                      id = {props.id} /> */}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};



export default UserEventCard;