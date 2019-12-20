import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class Login extends Component {
  
  constructor(){
    super();
    this.state={
      user:'',
      email:'',
      password:''
    }
  }
  handleChange(e){
    this.setState({[e.target.id]:e.target.value});
  }

  handleSubmit = (e) => {

    const email=this.state.email;
    const pwd=this.state.password;

    e.preventDefault();
    fetch('/user/' + email + '/' + pwd) 
      .then(res => res.json())
      .then(data => this.setState({user:data}));
    
  }


  render() {
     const user = this.state.user;
     if(user){
        return (
            <Redirect to={{pathname:'/feed' , state:{usr:user}}} />
            );
    }
    else {
      return (

     <div className="container">
        <form className="white" onSubmit={this.handleSubmit.bind(this)}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' name="email" onChange={this.handleChange.bind(this)} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' name="password" onChange={this.handleChange.bind(this)} />
          </div>
          <div className="input-field">
            <button type="submit" className="btn #009688 lighten-1 z-depth-0">Login</button>
          </div>
        </form>
      </div>

    );
  }
}}

export default Login;
