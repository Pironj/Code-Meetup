import React from 'react';
import API from '../../utils/API'

class CommentForm extends React.Component {
    constructor() {
        super();

        this.state = {
            events : "",
            creator : "", 
            body : ""
        }
    }

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
  
  
    _handleSubmit(comment) { 
      comment.preventDefault();   // prevents page from reloading on submit
      if (this.state.eventId && this.state.body && this.state.creator){
        API.createComment({
          event: this.state.eventId,
          body: this.state.body,
          creator: this.state.creator
        })
        .then(comment => console.log(comment))
        .catch(err => console.log(err));
      }
      // let author = this._author;
      // let body = this._body;
      // this.props.addComment(author.value, body.value);
    }
  
    render() {
      return (
        <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
          <div className="comment-form-fields">
            <input placeholder="Name" required ref={(input) => this._creator = input}></input><br />
            <textarea placeholder="Comment" rows="4" required ref={(textarea) => this._body = textarea}></textarea>
          </div>
          <div className="comment-form-actions">
            <button onClick={this.handleFormSubmit} type="submit">Post Comment</button>
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
  
  export default CommentForm;
//   