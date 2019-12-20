import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class GrpNav extends Component {

   constructor(props){
    super(props);
    this.state={
     grpidd : this.props.grpid,
     usrid : this.props.usrid
    }
  }

  render() {
    var id = this.state.grpidd;
    var usrid = this.state.usrid;
    return (

  <nav>
    <div className="nav-wrapper" style={{backgroundColor:'#009688'}}>
      <Link to="/" className="brand-logo" style={{fontSize:16}}>Groups</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to={"/grp/posts/" + id}>Posts</Link></li>
        <li><Link to={"/grp/members/" + id}>Members</Link></li>
        <li><Link to={"/grp/gallery/" + id}>Gallery</Link></li>
        <li><Link to={"/grp/edit/" + id}>Edit</Link></li>
        <li><Link to={"/grp/addmembers/" + id + '/' + usrid}>Add members</Link></li>
        <li><Link to={"/grp/about/" + id}>About</Link></li>
      </ul>
    </div>
  </nav>
      
    );
  }
}

export default GrpNav;