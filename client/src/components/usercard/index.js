import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import LinkButton from '../LinkButton'


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

const UserCard = (props) => {
    const classes = useStyles();

    //Here we are returning a "User Profile Card" that is shown on their profile page
    return (
        <Container>
            <div className="col-md-4">
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <React.Fragment>
                                {/* {props.user.email ? <p>Email: {props.user.email} </p> : ''} */}
                                <LinkButton to={`/users/${props.user._id}`}>{props.user.first_name + " " + props.user.last_name}</LinkButton>
                            </React.Fragment>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </Container>
    );
};


export default UserCard;

// export default function SimpleCard(props) {
//     const classes = useStyles();

//     return (
//         <div className = "col-md-4">
//             <Card className={classes.card}>
//                 <CardContent>
//                     <Typography variant="h5" component="h2">
//                         <React.Fragment>
//                             <p>Name: {props.} </p>
//                             <p>Email: {props.Email} </p>
//                         </React.Fragment>
//                     </Typography>
//                 </CardContent>

//             </Card>
//         </div>    
//     );
// };

