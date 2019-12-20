import React, { Component } from 'react';
import Follow from './follow';
import Followedpost from './followedpost';
import FeedNav from './feednav';
import {Link} from 'react-router-dom';

class Newsfeed extends Component {

  constructor(){
    super();
    this.state={
      me:'',
      post:'',
      title:''
    }
  }

   componentWillMount(){

    this.setState({me:this.props.location.state.usr});
  }

  handleSubmit = (e,id) => {

    e.preventDefault();
    //console.log('here i add post' + id);
    fetch('/addpost/' + id + '/' +  this.state.title);
    this.setState({title:''});

  }

  handleChange = (e) => {
    this.setState({title:e.target.value});
  }
  

  render() {

    if(this.state.me){
      var owner = this.state.me;
    return (
      <div>
      <FeedNav id={owner._id} />
      <div className="container">
        <div className='row'>
          <div className="col-11">
            <Link className='btn btn-primary' to={'/myprofile/' + owner._id}>My Profile</Link>
            <div className='outerbox'>
            <p style={{color:'#009688',marginLeft:10,marginTop:-1,fontWeight:'bold',fontSize:19}}>Newsfeed</p>
            <div className='innerbox'>
                <div className='innermost'>
                <p>{owner.name}</p>
                <p>{owner._id}</p>
                <form onSubmit={(e) => this.handleSubmit(e,owner._id)} className='white'>
                  <div className='input-field'>
                    <label htmlFor='title'>Post here</label>
                    <input type='text' name='title' value={this.state.title} onChange={this.handleChange} />
                  </div>
                  <div className='input-field'>
                    <button type="submit" className='btn pink lighten-1 z-dpth-0'>POST</button>
                  </div>
                </form>

                </div>
            </div>

            </div>

            <div style={{position:'absolute',top:500,left:50}} >
            <Followedpost usr_id= {owner._id} />
            </div>

          </div>

          <div style={{position:'fixed',left:700,top:87,width:650}}>
            <Follow usr_id= {owner._id}/>
          </div>

        </div>
     </div>
     </div>
    );
  } else {
    return (
    <div>
    </div>
  );
  }}
}

export default Newsfeed;
