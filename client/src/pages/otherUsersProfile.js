import React from 'react';
import API from '../utils/API';

class User extends React.Component {
  state = {
    user: {}
  };

  componentDidMount() {
    API.findUserById(this.props.match.params.id)
    .then(res => {
      console.log(res.data)
      this.setState({user: res.data})
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <p>{this.state.user._id}</p>
    )
  }
   
}

export default User