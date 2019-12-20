import React, { Component } from 'react';

class CreateGrp extends Component {

  constructor(){
    super();
    this.state={
        grpname:'',
        grpabout:''
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name] : e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    fetch('/creategrp/' + id + '/' + this.state.grpname + '/' + this.state.grpabout);
    this.setState({grpabout:'',grpname:''});
  }

  render() {
  
    return (
    
     <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create Group</h5>
          <div className="input-field">
            <label htmlFor="grpname">Group Name</label>
            <input type="text" name="grpname" value={this.state.grpname} onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="grpabout">About Group</label>
            <input type="text"  name="grpabout" value={this.state.grpabout} onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button type="submit" className="btn #009688 lighten-1 z-depth-0">Create</button>
          </div>
        </form>
      </div>

    );
  }
}

export default CreateGrp;


