import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import LinkButton from '../LinkButton';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
});

const UserCard = (props) => {
  const classes = useStyles();

  //Here we are returning a "User Profile Card" that is shown on their profile page
  return (
    <div style={{ 'margin-left': '5px', 'margin-right': '5px' }}>
      <LinkButton
        className={classes.card}
        to={`/users/${props.user._id}`}>{props.user.first_name + ' ' + props.user.last_name}
      </LinkButton>
    </div>
  );
};


export default UserCard;
