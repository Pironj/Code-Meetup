import React from 'react';
import API from '../../utils/API'

class CommentBox extends React.Component {
  constructor() {
    super();
    
    this.state = {
      showComments: false,
      comments: [
        {id: 1, author: "landiggity", body: "This is my first comment on this forum so don't be a dick"},
        {id: 2, author: "scarlett-jo", body: "That's a mighty fine comment you've got there my good looking fellow..."},
        {id: 3, author: "rosco", body: "What is the meaning of all of this 'React' mumbo-jumbo?"}
      ]

    };
  }

  _addComment(author, body) {
    const comment = {
      id: this.state.comments.length + 1,
      author,
      body
    };
    this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
  }
  
  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }


  _getComments() {    
    return this.state.comments.map((comment) => { 
      return (
        <Comment 
          author={comment.author} 
          body={comment.body} 
          key={comment.id} />
      ); 
    });
  }
  
  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return "1 comment";
    } else {
      return `${commentCount} comments`;
    }
  }


  handleFormSubmit = comment => {
    comment.preventDefault();
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





  
  render () {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = 'Show Comments';
    
    if (this.state.showComments) {
      buttonText = 'Hide Comments';
      commentNodes = <div className="comment-list">{comments}</div>;
    }
    
    return(
      <div className="comment-box">
        <h2>Join the Discussion!</h2>
        <CommentForm addComment={this._addComment.bind(this)}/>
        <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
          {buttonText}
        </button>
        <h3>Comments</h3>
        <h4 className="comment-count">
          {this._getCommentsTitle(comments.length)}
        </h4>
        {commentNodes}
      </div>  
    );
  } // end render
  
  
} // end CommentBox component

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
          <input placeholder="Name" required ref={(input) => this._author = input}></input><br />
          <textarea placeholder="Comment" rows="4" required ref={(textarea) => this._body = textarea}></textarea>
        </div>
        <div className="comment-form-actions">
          <button onClick={this.handleFormSubmit} type="submit">Post Comment</button>
        </div>
      </form>
    );
  } // end render
  
} // end CommentForm component



class Comment extends React.Component {
  render () {
    return(
      <div className="comment">
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">- {this.props.body}</p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete" onClick={this._deleteComment}>Delete Comment</a>
        </div>
      </div>
    );
  }
  _deleteComment() {
    alert("-- DELETE Comment Functionality COMMING SOON...");
  }
}

export default CommentBox;