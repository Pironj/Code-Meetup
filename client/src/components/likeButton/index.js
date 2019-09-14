import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateUserLikesEvent } from '../../redux/actions/eventDetailActions';

import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';


// Get redux store state 
const mapStateToProps = (state) => {
  return {
    // authState
    id: state.authState.id,

    // eventDetail
    event: state.eventDetail.event,
    numEventLikes: state.eventDetail.numEventLikes,
    userLikesEvent: state.eventDetail.userLikesEvent,
  };
};

// Get redux store actions
const mapDispatchToProps = (dispatch) => {
  return {
    updateUserLikesEvent: (eventId) => {
      dispatch(updateUserLikesEvent(eventId))
    },
  }
}

class LikeButtonAndCount extends React.Component {

  /**
    * Like or unlike the event. Updates number of likes for event 
  */
  handleEventLikeClick = () => {
    this.props.updateUserLikesEvent(this.props.event._id);
  }

  render() {
    return (
      <React.Fragment>

        {/* Like event buttons */}
        {
          this.props.id ?

            <IconButton
              color="primary"
              onClick={this.handleEventLikeClick}>
              {
                this.props.userLikesEvent ?
                  <ThumbUpIcon />
                  :
                  <ThumbUpOutlinedIcon />
              }
            </IconButton>
            :
            <ThumbUpOutlinedIcon />
        }

        {
          this.props.numEventLikes
        }
      </React.Fragment>
    )
  }
}

LikeButtonAndCount.propTypes = {
	// state
  id: PropTypes.string,
  event: PropTypes.object,
	numEventLikes: PropTypes.number,
	userLikesEvent: PropTypes.bool,

	// functions
	updateUserLikesEvent: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeButtonAndCount);
