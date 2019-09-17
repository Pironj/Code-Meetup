import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Button from 'react-bootstrap/Button';
import './style.css';


const LinkButton = (props) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props;
  return (
    <Button
      id="userAttendingBtn"
      style={{
        marginTop: '1rem',
        marginBottom: '.5rem',
        paddingTop: '1.5rem',
        borderColor: 'rgb(215, 215, 215)',
        borderRadius: '3rem',
        backgroundColor: 'white',
        color: 'black',
        textAlign: 'center',
        height: '5rem',
        fontSize: '1rem'
      }}
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event);
        history.push(to);
      }}
    />
  );
};

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default withRouter(LinkButton);