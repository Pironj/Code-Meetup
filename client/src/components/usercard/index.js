import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import API from "../../utils/API";

const useStyles = makeStyles({
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

export default function SimpleCard(props) {
    const classes = useStyles();

    return (
        <div className = "col-md-4">
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        <React.Fragment>
                            <p>Name:</p>
                            <p>Email: {props.email} </p>
                        </React.Fragment>
                    </Typography>
                </CardContent>
           
            </Card>
        </div>    
    );
};

