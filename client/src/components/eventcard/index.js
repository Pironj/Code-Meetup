import React from 'react';
import './style.css';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Card, Container } from 'react-bootstrap';
// import Moment from "react-moment";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


const EventCard = (props) => {
  const classes = useStyles();

  // const calendarStrings = {
  //   lastDay: '[Yesterday at] LT',
  //   sameDay: '[Today at] LT',
  //   nextDay: '[Tomorrow at] LT',
  //   lastWeek: '[last] dddd [at] LT',
  //   nextWeek: 'dddd [at] LT',
  //   sameElse: 'L'
  // };

  //Returns event cards with title, creator, date, location, etc
  return (
    <div>

      <Container>
        <Card className="eventCard" border="dark" style={{ width: '20rem', height: '20rem', marginTop: '3rem' }}>
          <Card.Header className="eventHead">{props.title}</Card.Header>
          <Card.Body>
            <Card.Text>
              {props.description.substring(0, 100) + '...'}
            </Card.Text>
            <Card.Text>
              {props.location}
            </Card.Text>
            <Card.Text>
              {/* <Moment
                format="MM/DD/YYYY HH:mm"
                style={{ fontWeight: 'bold' }}
                calendar={calendarStrings}>{props.date}
              </Moment> */}
              {/* <br></br> */}
              {/* use this for month/day/timeam/pm format */}
              <strong>{props.format}</strong>
            </Card.Text>


            <Fab
              variant="extended"
              size="small"
              color='default'
              aria-label="add"
              component={RouterLink}
              to={`/events/${props.id}`}
              // className={classes.margin}
              style={{position: 'absolute', bottom: '15px'}}
            >
              <NavigationIcon className={classes.extendedIcon} />
              Details
            </Fab>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};



export default EventCard;