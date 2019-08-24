import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { indigo } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
    padding: 40,
    color: '#fff',
    backgroundColor: indigo['500']
  }
});

export default function LetterAvatars() {
  const classes = useStyles();

  return (

    <Avatar className={classes.avatar}>User</Avatar>

  );
}

