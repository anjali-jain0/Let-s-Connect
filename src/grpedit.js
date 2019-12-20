import React, { Component } from 'react';

class editGrpProfile extends Component {

  constructor(){
    super();
    this.state={
      name:'',
      about:''
    }
  }


  handleChange = (e) => {
     this.setState({[e.target.id]:e.target.value});
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const {name , about} = this.state ; 
    fetch('/changegrpprofile/' + id + '/' + name + '/' + about)
    .then(res => res.json())
    .then(data => console.log('edited group profile'));
  }

  render() {
    return (

     <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Edit Profile</h5>
          <div className="input-field">
            <label htmlFor="name">Group Name</label>
            <input type="text" id='name' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="text">Group Bio</label>
            <input type="text" id='about' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn #009688 lighten-1 z-depth-0">Edit</button>
          </div>
        </form>
      </div>

    );
  }
}

export default editGrpProfile;
