import React from 'react';
import API from '../../utils/API';
import { connect } from 'react-redux';
import LoginModal from '../LoginModal';
import { Card, Button, Footer } from 'react-bootstrap';
import './style.css';

const mapStateToProps = (state) => {
  return {
    id: state.authState.id,
    first_name: state.authState.first_name,
    last_name: state.authState.last_name,
    email: state.authState.email,
    token: state.authState.token,
  };
}


class CommentBox extends React.Component {

  state = {
    showComments: true,
    comments: [],
    body: '',
    title: ""
  }

  componentDidMount() {
    this.getComments()
  }

  //Function grabs all comments for specific event 
  getComments = () => {
    API.findCommentsForEventId(this.props.eventId)
      .then(res => {
        this.setState({
          comments: res.data
        })

      })
      .catch(err => console.log(err))
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  //Function to add/create comment on page and also creating/updating comments in DB
  _addComment = () => {
    const { body } = this.state
    const comment = {
      eventId: this.props.eventId,
      creator: this.props.id,
      body
    };

    API.createComment(comment)
      .then(res => {
        // *new array references help React stay fast, so concat works better than push here.  
        this.setState({ comments: this.state.comments.concat([res.data]), body: ''}) 
      })
      .catch(err => console.log(err.response));
  }

  //Click function for show comments button
  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  // Function to delete user comments
  _deleteComment = (commentId) => {

    API.deleteCommentById(commentId)
      .then(res => {
        const updatedEventComments = this.state.comments.filter(comments => {
          return comments._id !== res.data._id
        })
        this.setState({ comments: updatedEventComments })
      })
      .catch(err => console.log(err));
  }

  //Returns a list of comments with speicif parameters
  _getComments() {
    return this.state.comments.map((comment) => {
      return (
        <div
          id="comment"
          key={comment._id}>
            <Comment
              creator={comment.creator.first_name + " " + comment.creator.last_name}
              body={comment.body}
              key={comment._id}
            />
            <Card.Body id="delete">
              {
                this.props.first_name + " " + this.props.last_name === comment.creator.first_name + " " + comment.creator.last_name
                  ?
                  <Button className="comment-footer-delete" variant="light" onClick={() => this._deleteComment(comment._id)}>❌</Button>
                  :
                  <div></div>
              }
            </Card.Body>
        </div>
      );
    });
  }

  //Returns the user the number of comments in event
  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return "1 comment";
    } else {
      return `${commentCount} comments`;
    }
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = 'Show comments';

    if (this.state.showComments) {
      buttonText = 'Hide comments';
      commentNodes = <div className="comment-list">
        {comments}
      </div>;
    }

    return (
      <div className="comment-box">
        {
          this.props.first_name ?
            <Card>
              <Card.Header id="joinDisc">
                <h2>Join the Discussion!</h2>
              </Card.Header>
              <Card.Body id="textarea">
                <textarea rows="6" style={{ paddingLeft: '.25rem', borderRadius: '1rem', borderWidth: '.10rem', borderColor: '#BDC7D8', width: '-webkit-fill-available' }} name="body" value={this.state.body} onChange={this.handleChange} />
              </Card.Body>
              <Card.Footer>
                <button id="submitComment" onClick={this._addComment} style={{ width: '4rem', marginTop: '.5rem', marginBottom: '.75rem', marginLeft: '.75rem' }}>
                  Submit
                </button>
              </Card.Footer>
            </Card>
            :
            <div>
              <h2>Please Sign in to join the discussion</h2>
              <br></br>
              <LoginModal />
            </div>
        }

        <button style={{ width: '8rem', marginTop: '3rem' }} className="comment-reveal" onClick={this._handleClick.bind(this)}>
          {buttonText}
        </button>
        {/* <h3 style={{ marginTop: '1rem' }}>Comments</h3> */}
        <h4 style={{ marginBottom: '3rem', marginTop: '1rem' }} className="comment-count">
          {this._getCommentsTitle(comments.length)}
        </h4>
        {commentNodes}
      </div>
    );
  }
}


class Comment extends React.Component {
  render() {
    return (
      <Card id="commentCards">
        <Card.Header id="eventHead">{this.props.creator} said: </Card.Header>
        <Card.Body id="commentBody">
          <Card.Text>{this.props.body}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default connect(mapStateToProps)(CommentBox, Comment);
