import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class GrpMembers extends Component {

   constructor(){
    super();
    this.state={
      grpinfo:'',
      memberid:''
    }
  }

  componentWillMount = () => {
    const id = this.props.match.params.id;
    fetch('/grpabout/' + id)
    .then(res => res.json())
    .then(data => this.setState({grpinfo:data}));
  }

  handleRemove = (memid , grpid) => {
    fetch('/removeGrpMember/' + memid + '/' + grpid)
    .then(res => res.json())
    .then(data => {
      fetch('/grpabout/' + grpid)
      .then(res => res.json())
      .then(data => this.setState({grpinfo:data}));
    })
  }

  handleProfile = (id,grpid) => {
    fetch('/memberprofile/' + id + '/' + grpid)
    .then(res => res.json())
    .then(data => this.setState({memberid:data}));
  }

  render() {

    
    if(this.state.grpinfo){
    var grp = this.state.grpinfo[0];
    if(grp && grp.members){
      var members = (grp.members && grp.members.map(member => {
                    return (
                         <div className="col-sm-4">
                          <div className="card">
                            <div className="card-body">
                              <h5 className="card-title">{member.name}</h5>
                             <button class="btn btn-primary" 
                             onClick={() => this.handleProfile(member._id , this.props.match.params.id)}>
                                Profile
                             </button>
                              <button onClick={() => this.handleRemove(member._id , this.props.match.params.id)} 
                              class="btn btn-primary">Remove</button>
                            </div>
                          </div>
                        </div>
                    );
      })
      );
    } else {
      var members = "No members in this group to show..";
    }}

    const _id = this.state.memberid;
     if(_id){
        return (
            <Redirect to={'/userprofile/' + _id} />
            );
    }
    else {

      return (

        <div>
         <div className="container">
            <div className="row">
            {members}
            </div>
        </div>
        </div>

      );
    }
  }
}

export default GrpMembers;