import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { indigo } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: indigo [500]
  }
});

export default function LetterAvatars() {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Avatar className={classes.avatar}>H</Avatar>
    </Grid>
  );
};

