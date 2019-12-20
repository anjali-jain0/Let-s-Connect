import React, { Component } from 'react';

class User extends Component {

  constructor(){
    super();
    this.state={
      users:[]
    }
  }

  componentDidMount(){

    fetch('/user')
    .then(res => res.json())
    .then(data => this.setState({users:data[0].name}));
  }

  render() {
    return (
      <div className="text">
      {this.state.users}
      </div>
    );
  }
}

export default User;
