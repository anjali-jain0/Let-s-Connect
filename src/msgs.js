import React, { Component } from 'react';

class Notification extends Component {

  constructor(){
    super();
    this.state={
     users : ''
    }
  }

  componentWillMount(){
    fetch('/user')
      .then(res => res.json())
      .then(data => this.setState({users : data}))
  }

  render() {
  
    var msgs = (this.state.users && this.state.users.msgs.map(msg => {
      return (
        <li className="collection-item avatar">
        <img src="images/yuna.jpg" alt="" className="circle" />
        <span className="title">{msg}</span>
        <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
        </li>
      );
        })
        )
  
    return (
    
      <ul className="collection">
      {msgs}
      </ul>

    );
  }
}

export default Notification;

