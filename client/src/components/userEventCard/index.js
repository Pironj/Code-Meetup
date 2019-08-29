import React from 'react';
import './style.css';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';

import { Card, Row, Container } from 'react-bootstrap';
import Moment from "react-moment";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0),
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
  const classes = useStyles();

  //Here we are returning a User Event Card
  return (
    <div>
      <Container>
        <Card className="eventCard" border="dark" style={{ width: '20rem', height: '20rem', marginTop: '3rem' }}>
          <Card.Header className="eventHead">{props.title}</Card.Header>
          <Card.Body >

            <Card.Text className="eventBody">
              {props.description.substring(0, 100) + "..."}
            </Card.Text>

            <Card.Text className="eventBody">
              <Moment // Moment JS used to display calendar dates
                style={{ fontWeight: 'bold' }}
                calendar={calendarStrings}>{props.date}
              </Moment>
            </Card.Text>

            <hr></hr>
            
            {/* Detail view button */}
            <Row style={{ marginLeft: '6rem' }}>
              <Fab
                variant="extended"
                size="small"
                color="secondary"
                aria-label="add"
                component={RouterLink}
                to={`/events/${props.id}`}
                className={classes.margin}
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
                    className={classes.margin}
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