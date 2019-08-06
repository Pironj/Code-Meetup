import React from 'react';
import './style.css';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
// import teal from '@material-ui/core/colors/teal';
import Fab from '@material-ui/core/Fab';
// import NavigationIcon from '@material-ui/icons/Navigation';
import { Card, Col, Row, Container } from 'react-bootstrap';
// import App from "../eventDetailModal";
// import API from '../../utils/API';
import Moment from "react-moment";

// const useStyles = makeStyles(theme => ({
//   margin: {
//     margin: theme.spacing(0),
//   },
//   extendedIcon: {
//     marginRight: theme.spacing(1),
//   },
// }));

const calendarStrings = {
  lastDay: '[Yesterday at] LT',
  sameDay: '[Today at] LT',
  nextDay: '[Tomorrow at] LT',
  lastWeek: '[last] dddd [at] LT',
  nextWeek: 'dddd [at] LT',
  sameElse: 'L'
};

// const color = teal[500]


const UserEventCard = (props) => {
  // const classes = useStyles();

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
                calendar={calendarStrings}>{props.date}
              </Moment>
              <hr></hr>
            </Card.Text>

            {/* Detail view button */}
            <Row>
              <Fab
                variant="extended"
                size="small"
                color="secondary"
                aria-label="add"
                component={RouterLink}
                to={`/events/${props.id}`}
                // className={classes.margin}
                style={{ marginLeft: '14rem' }}
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
                  // className={classes.margin}
                  style={{marginLeft: '10rem'}}
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
                    // className={classes.margin}
                    style={{marginLeft: '4rem'}}
                    onClick={props.onDelete}

                  >
                    Delete
                  </Fab>
                )
                  : ''
              }
            </Row>
            <Row />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};



export default UserEventCard;