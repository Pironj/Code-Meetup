import React from 'react';
import API from '../../utils/API';
import { connect } from 'react-redux';
import LoginModal from '../LoginModal';
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
  
  constructor() {
    super();
    
    this.state = {
      showComments: true,
      comments: [],
      body: '',
      // creator: "41224d776a326fb40f000001",
      title:"",
      // id: "41224d776a326fb40f000001"
    };

    
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
      console.log(res);
    })
    .catch(err => console.log(err))
  }


//Render buttons for Show/Hide comments

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = 'Show Comments';

    if (this.state.showComments) {
      buttonText = 'Hide Comments';
      commentNodes = <div className="comment-list">{comments}</div>;
    }

    return (
      <div className="comment-box">
        {
          this.props.first_name ? 
            <div>
              <h2>Join the Discussion!</h2>
              {/* <input style={{paddingLeft: '.25rem', borderRadius: '1rem', borderWidth: '.10rem', borderColor: '#BDC7D8'}}name="title" value={this.state.title} onChange={this.handleChange} /> */}
              <textarea rows="6" style={{paddingLeft: '.25rem', borderRadius: '1rem', borderWidth: '.10rem', borderColor: '#BDC7D8', width: '25rem'}} name="body" value={this.state.body} onChange={this.handleChange} />
              <br></br>
              <button id="submitComment" onClick={this._addComment}>
              submit
              </button>
            </div>
          :
            <div>
              <h2>Please Sign in to join the discussion</h2>
              <br></br>
              <LoginModal />
            </div>

        }

        {/* <CommentForm addComment={this._addComment.bind(this)} /> */}
        <button className="comment-reveal" onClick={this._handleClick.bind(this)}>
          {buttonText}
        </button>
        <h3 style={{marginTop: '1rem'}}>Comments</h3>
        <h4 style={{marginBottom: '5rem'}} className="comment-count">
          {this._getCommentsTitle(comments.length)}
        </h4>
        {commentNodes}
      </div>
    );
  } // end render

  // _addComment(creator, body) {
    
  //   const comment = {
  //     id: this.state.comments.length + 1,
  //     creator,
  //     body
  //   };
  //   this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
  // }

//
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value})
  }

//Function to add/create comment on page and also creating/updating comments in DB

  _addComment=()=> {

    const {body} = this.state
    const comment = {
      event:this.props.eventId,
      creator: this.props.id,
      body
    };
    console.log(comment);

    API.createComment(comment)
    .then(comment => {
      console.log(comment)
      this.getComments()})
    .catch(err => console.log(err.response));

    this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
  }


//Click function for show comments button

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

//   _addComment=()=> {
//   const {id, creator, body} = this.state

// }


//Returns a list of comments with speicif parameters
  _getComments() {
    return this.state.comments.map((comment) => {
      return (
        <Comment
          creator={comment.creator.first_name + " " + comment.creator.last_name}
          body={comment.body}
          key={comment.id} />
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

//Submit function to create comment in DB
  handleFormSubmit = event => {
    console.log(event.target)
    event.preventDefault();
    if (this.state.event && this.state.body && this.state.creator) {
      API.createComment({
        event: this.state.event,
        body: this.state.body,
        creator: "5d3df98b54ed5491826d7eae"
      })
        .then(comment => console.log(comment))
        .catch(err => console.log(err));
    }
  };
}


//   handleFormSubmit = comment => {
//     comment.preventDefault();
//     if (this.state.event && this.state.body && this.state.creator) {
//         API.createComment(comment)
//         .then(comment => {
//           console.log(comment)
//           this.getComments()})
//         .catch(err => console.log(err));
//     }
//   };
// }





  // render() {
  //   const comments = this._getComments();
  //   let commentNodes;
  //   let buttonText = 'Show Comments';

  //   if (this.state.showComments) {
  //     buttonText = 'Hide Comments';
  //     commentNodes = <div className="comment-list">{comments}</div>;
  //   }

  //   return (
  //     <div className="comment-box">
  //       <CommentForm addComment={this._addComment.bind(this)} />
  //       <button style={{ marginBottom: '2rem', borderRadius: '1rem', borderWidth: '.10rem', borderColor: '#BDC7D8' }} id="comment-reveal" onClick={this._handleClick.bind(this)}>
  //         {buttonText}
  //       </button>
  //       <h4>Comments</h4>
  //       <h4 className="comment-count">
  //         {this._getCommentsTitle(comments.length)}
  //       </h4>
  //       {commentNodes}
  //     </div>
  //   );
  // } // end render


// } // end CommentBox component

class CommentForm extends React.Component {


  // handleFormSubmit = comment => {
  //   comment.preventDefault();
  //   if (this.state.event && this.state.body && this.state.creator) {
  //     API.createComment({
  //       event: this.state.event,
  //       body: this.state.body,
  //       creator: this.state.creator
  //     })
  //       .then(comment => console.log(comment))
  //       .catch(err => console.log(err));
  //   }
  // };

//Submit button function updates page
  _handleSubmit(event) {
    event.preventDefault();   // prevents page from reloading on submit
    let author = this._author;
    let body = this._body;
    this.props.addComment(author.value, body.value);
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <div className="comment-form-fields">
          <textarea placeholder="Name" style={{ paddingLeft: '.25rem', paddingRight: '10rem', borderRadius: '1rem', borderWidth: '.10rem', borderColor: '#BDC7D8' }} required ref={(input) => this._creator = input}></textarea><br />
          <textarea placeholder="Comment" style={{ paddingLeft: '.25rem', paddingRight: '10rem', borderRadius: '1rem', borderWidth: '.10rem', borderColor: '#BDC7D8' }} rows="3" required ref={(textarea) => this._body = textarea}></textarea>
        </div>
        <div className="comment-form-actions">
          <button style={{ borderRadius: '1rem', borderWidth: '.10rem', borderColor: '#BDC7D8', marginBottom: '.50rem' }} onClick={this.handleFormSubmit} type="submit">Post Comment</button>
        </div>
      </form>
    );
  } // end render

  _handleSubmit(event) {
    event.preventDefault();   // prevents page from reloading on submit
    let creator = this._creator;
    let body = this._body;
    this.props.addComment(creator.value, body.value);
  }
} // end CommentForm component



class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <p className="comment-header">{this.props.creator}</p>
        <p className="comment-body">- {this.props.body}</p>
        <div className="comment-footer">
          <a type="button" className="comment-footer-delete" onClick={this._deleteComment}>❌</a>
        </div>
      </div>
    );
  }
  // _deleteComment() {
  //   alert("-- DELETE Comment Functionality COMMING SOON...");
  // }
}


export default connect(mapStateToProps)(CommentBox);