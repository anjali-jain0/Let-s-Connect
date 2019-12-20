import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
  render() {
    //make edit profile page
    return (

  <nav>
    <div className="nav-wrapper" style={{backgroundColor:'#009688'}}>
      <Link to="/" className="brand-logo" style={{fontSize:16}}>MERN Social<i class="material-icons right">account_balance</i></Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to={"/myprofile/" + this.props.id}>Profile</Link></li>
        <li><Link to={"/editprofile/" + this.props.id}>Edit Profile</Link></li>
        <li><Link to="/">Log Out</Link></li>
      </ul>
    </div>
  </nav>
      
    );
  }
}

export default Nav;