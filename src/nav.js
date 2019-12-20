import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
  render() {
    return (

  <nav>
    <div className="nav-wrapper" style={{backgroundColor:'#009688'}}>
      <Link to="/" className="brand-logo" style={{fontSize:16}}>MERN_SOCIAL<i class="material-icons right">account_balance</i></Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/signin">LOG IN</Link></li>
        <li><Link to="/signup">REGISTER</Link></li>
      </ul>
    </div>
  </nav>
      
    );
  }
}

export default Nav;