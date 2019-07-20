import React from 'react';
import './style.css'
import {InputGroup, FormControl, Button} from 'react-bootstrap';


function CommentBox () {
  return (

  <div>
 <InputGroup className="mb-3">
    <FormControl
      placeholder="Leave a Comment Here!"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />
  </InputGroup>
  <Button variant="dark">Submit</Button>
  
</div>



  )
}

export default CommentBox;