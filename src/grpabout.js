import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class GrpAbout extends Component {

   constructor(){
    super();
    this.state={
      grpinfo:''
    }
  }

  componentWillMount = () => {
    const id = this.props.match.params.id;
    fetch('/grpabout/' + id)
    .then(res => res.json())
    .then(data => this.setState({grpinfo:data}));
  }

  render() {
    
    var grp = this.state.grpinfo;

    var compo = (grp && grp.map(grp => {
      return (
      <div className="card">
      <div className="card-header">
        About Group
      </div>
      <div className="card-body">
        <h5 className="card-title">{grp.name}</h5>
        <p className="card-text">{grp.about}</p>
      </div>
    </div>
    );
    }))

    return (
    <div>
    {compo}
    </div>
  );
  }
}

export default GrpAbout;