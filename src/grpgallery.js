import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class GrpGallery extends Component {

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
    
    if(this.state.grpinfo){
      var grp = this.state.grpinfo;
      if(grp[0].gallery.length!=0){
      var image = (grp.gallery && grp.gallery.map(pic => {
                    return (
                        <div className="col-sm-4">
                          <img src={pic} alt="image" />
                        </div>
                    
                  );
      })
      );
    } else {
      var image = "No Images in gallery to show..";
    }}
    return (

      <div>
       <div className="container">
          <div className="row">
          {image}
          </div>
      </div>
      </div>

    );
  }
}

export default GrpGallery;