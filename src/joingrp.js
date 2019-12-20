import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class GrpMembers extends Component {

   constructor(){
    super();
    this.state={
     alljoingrp:[],
     allgrp:'',
     exist:'',
     uid:''
    }
  }

  componentWillMount = () => {
    const id = this.props.match.params.id;
    fetch('/getalljoingrp/' + id)
    .then(res => res.json())
    .then(data => this.setState({alljoingrp:data}));
  }
 
  handleJoin = (grpid , id) => {
    fetch('/checkgrp/' + id + '/' + grpid)
    .then(res => res.json())
    .then(data => this.setState({exist:data.exist,uid:data.id}));
  }

  removeJoinGrp = (id) => {
    const usrid = this.props.match.params.id;
    fetch('/removejoingrp/' + id + '/' + usrid)
    .then(res => res.json())
    .then(data => this.setState({exist:''}));
  }

  addmember = (grpid) => {
    const usrid = this.props.match.params.id;
    console.log(usrid);
    fetch('/addmember_joingrp/' + grpid + '/' + usrid)
    .then(res => res.json());
  }

  render() {

    if(this.state.exist=='yes' && this.state.uid){
      console.log('You are already a member of this group');
      this.removeJoinGrp(this.state.uid);
    }

    if(this.state.exist=='no' && this.state.uid){
      console.log('Added to group');
      this.addmember(this.state.uid);
      this.removeJoinGrp(this.state.uid);
    }

    
    if(this.state.alljoingrp.length){
    var grps = (this.state.alljoingrp && this.state.alljoingrp.map(grp => {
                    return (
                         <div className="col-sm-4">
                          <div className="card">
                            <div className="card-body">
                              <h5 className="card-title">{grp.id}</h5>
                              <button onClick={() => this.handleJoin(grp.id , this.props.match.params.id)} 
                              class="btn btn-primary">Join Group</button>
                            </div>
                          </div>
                        </div>
                    );
      })
      )
    } else {
      var grps = <div>No Invites</div>;
    }

      return (    
        <div>
         {grps}
        </div>

      );
  }
}

export default GrpMembers;