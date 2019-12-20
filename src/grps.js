import React, { Component } from 'react';
import GrpNav from './grpnav';

class Groups extends Component {

  constructor(props){
    super(props);
    this.state={
     grpinfo : this.props.location.state.grpinfom,
     userinfo : this.props.location.state.user 
    }
  }


  render() {
   
    return (
     <div>
        <GrpNav grpid={this.state.grpinfo[0]._id } usrid={this.state.userinfo._id} />
     </div>

    );
  }
}

export default Groups;

