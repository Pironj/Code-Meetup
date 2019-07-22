import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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

export default function SimpleCard() {
    const classes = useStyles();

    return (
        <div className = "col-md-4">
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        <React.Fragment>
                            <td>Name: </td>
                            <td>Email: </td>
                        </React.Fragment>
                    </Typography>
                </CardContent>
           
            </Card>
        </div>    
    );
};

export default UserCard;