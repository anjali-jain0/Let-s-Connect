import React, { Component } from 'react';

class EditProfile extends Component {

  constructor(){
    super();
    this.state={
      email:'',
      name:''
    }
  }


  handleChange = (e) => {
     this.setState({[e.target.id]:e.target.value});
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const {name , email} = this.state ; 
    fetch('/changeprofile/' + id + '/' + email + '/' + name)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  render() {
    return (

     <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Edit Profile</h5>
          <div className="input-field">
            <label htmlFor="name">Username</label>
            <input type="text" id='name' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn #009688 lighten-1 z-depth-0">Edit</button>
          </div>
        </form>
      </div>

    );
  }
}

export default EditProfile;
