import React, { Component } from 'react';
import './index.css';
import Nav from './nav';
import Pic from './frontimg.jpg';

class Dashboard extends Component {
  render() {
    return (

    <div>
      <Nav />
      <div className="box">
      <p className='para'>Home Page</p>
      <img className='pic' src={Pic} alt='frontpic' />
      <p className='para para1'>Welcome to Mern_Social home page</p>
      </div>
    </div>

    );
  }
}

export default Dashboard;
