import React, { Component } from 'react';
import {NavLink , Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class MyProfile extends Component {

  constructor(){
    super();
    this.state={
      user:'',
      grp:'',
      grpinfo:'',
      flag:'normal',
      following:'',
      followers:'',
      tag:'',
      share:'',
      msgs:'',
      post:'',
      usergrp:''
    }
  }

  componentWillMount(){

    fetch('/user/' + this.props.match.params.id)
    .then(res => res.json())
    .then(data => this.setState({user:data}))
  }

  handleGrp1 = (e) => {
    console.log('came');
    console.log(e.target.value)
    this.setState({grp:e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch('/getgrp/' + this.state.grp)
    .then(res => res.json())
    .then(data => this.setState({grpinfo:data}));
  }

  handleFollowing = (id) => {
    fetch('/myfollowing/' + id)
    .then(res => res.json())
    .then(data => this.setState({following:data,flag:'following'}));
  }

  handleFollowers = (id) => {
    fetch('/myfollowers/' + id)
    .then(res => res.json())
    .then(data => this.setState({followers:data,flag:'followers'}));
  }

   handlePosts = (id) => {
    fetch('/myposts/' + id)
    .then(res => res.json())
    .then(data => this.setState({post:data,flag:'posts'}));
  }
  
  handleTag = (id) => {
    fetch('/mytag/' + id)
     .then(res => res.json())
    .then(data => this.setState({tag:data,flag:'tag'}));
  }

  handleShare = (id) => {
    fetch('/myshare/' + id)
     .then(res => res.json())
    .then(data => this.setState({share:data,flag:'share'}));
  }

  handleGroups = (id) => {
    fetch('/getallgrp/' + id)
      .then(res => res.json())
      .then(data => this.setState({usergrp:data,flag:'groups'}));
  }

  handleMessages = (id) => {
    fetch('/mymessages/' + id)
    .then(res => res.json())
    .then(data => this.setState({msgs:data,flag:'msgs'}));
  }

  render() {


    if(this.state.user)
       var user=this.state.user[0];
    
    var grps=<div></div>;

    if(this.state.usergrp.length>0){
      console.log('here');
    grps = (this.state.usergrp && this.state.usergrp.map(grp => {
          return (
            <div>
            <input type="text" name="grpname" value={grp} onClick = {this.handleGrp1} />
            </div>
          );
        })
      )
    }

     var flag=this.state.flag;

     if(this.state.flag==='normal' && user){
         state =  (
          <div>
            <h5 className="card-title">Name :{user.name} - {user.initials}</h5>
            <p className="card-text">Email : {user.email} , Joined On : {user.joindate}</p>
          </div>
        )
        }

    else if(this.state.flag==='followers' && user){
      var  state = (
        <div>
      <ul className="collection">
      {this.state.followers && this.state.followers.map(usr => {
      if(usr._id !== user._id){
        return (
            <li className="collection-item avatar">
              <img src={usr.img} alt="" className="circle" />
              <span className="title">{usr.name}</span>
              <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              <NavLink to={'/userprofile/' + usr._id}><button class="btn btn-outline-warning">View Profile</button></NavLink>
              <button class="btn btn-outline-success" onClick={() => this.handleClick(usr._id)} > Follow </button>
            </li>
          ); }})}
      </ul>
      </div>
        );
    }

     else if(this.state.flag==='following' && user){
      var  state = (
        <div>
      <ul className="collection">
      {this.state.following && this.state.following.map(usr => {
      if(usr._id !== user._id){
        return (
            <li className="collection-item avatar">
              <img src={usr.img} alt="" className="circle" />
              <span className="title">{usr.name}</span>
              <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              <NavLink to={'/userprofile/' + usr._id}><button class="btn btn-outline-warning">View Profile</button></NavLink>
              <button class="btn btn-outline-success" onClick={() => this.handleClick(usr._id)} > Follow </button>
            </li>
          ); }})}
      </ul>
      </div>
        );
    }

    else if(this.state.flag==='posts' && user){
      state=(this.state.post && this.state.post.map(post => {
              return (

                  <div className="card" >
                    <img className="card-img-top" src={post.pic} alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">{post.name} ,  {post.date}</h5>
                      <p class="card-text">Caption : {post.caption}</p>
                    </div>
                  <div className="card-footer text-muted">
                      <p>Likes : {post.likes}</p>
                      <p>Comment : {post.comment}</p>
                  </div>
                </div>
      ) }))
    }

     else if(this.state.flag==='tag' && user){
       var state=(this.state.tag && this.state.tag.map(post => {
              return (

                  <div className="card" style="width: 20rem;">
                    <img className="card-img-top" src={post.pic} alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">{post.name} ,  {post.date}</h5>
                      <p class="card-text">Caption : {post.caption}</p>
                    </div>
                  <div className="card-footer text-muted">
                      <p>Likes : {post.likes}</p>
                      <p>Comment : {post.comment}</p>
                  </div>
                </div>
      ) }))
    }

    else if(this.state.flag==='share' && user){
     var state=(this.state.share && this.state.share.map(post => {
              return (

                  <div className="card" style="width: 20rem;">
                    <img className="card-img-top" src={post.pic} alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">{post.name} ,  {post.date}</h5>
                      <p class="card-text">Caption : {post.caption}</p>
                    </div>
                  <div className="card-footer text-muted">
                      <p>Likes : {post.likes}</p>
                      <p>Comment : {post.comment}</p>
                  </div>
                </div>
      ) }))
    }
   
    else if(this.state.flag==='groups' && user){

     var state = (<div><form onSubmit = {this.handleSubmit} >
                     {grps}
                      <input type='submit' value='Search' />
                  </form>
                  <p><Link to={'/creategrp/' + user._id}><button>Create Group</button></Link></p>
                  <p><Link to={'/joingrp/' + user._id}><button>Join Group</button></Link></p>
                  </div>
                )
    }  

    else if(this.state.flag==='msgs' && user){
      state = (this.state.msgs && this.state.msgs.map(msg => {
        return (
          <div className="card">
            <div className="card-header">
              {msg}
            </div>
          </div>
    ) }) )
    }



    if(this.state.grpinfo && user){
      return (
       <Redirect to={{pathname:'/grps' , state:{grpinfom:this.state.grpinfo , user:user}}} />
      );
    }
     else {
 
      return (
     <div>

        <div style={{top:100,left:200,width:930,height:400,position:'absolute'}} className="card text-center">
          <div className="card-header">
            <nav>
              <span>
                <button onClick={() => this.handleFollowing(this.props.match.params.id)}>Following</button>
              </span>
               <span>
                <button onClick={() => this.handleFollowers(this.props.match.params.id)}>Followers</button>
               </span>
               <span>
                <button onClick={() => this.handlePosts(this.props.match.params.id)}>Posts</button>
               </span>
               <span>
                <button onClick={() => this.handleTag(this.props.match.params.id)}>Tag</button>
               </span>
               <span>
                <button onClick={() => this.handleShare(this.props.match.params.id)}>Share</button>
               </span>
               <span>
                <button onClick={() => this.handleGroups(this.props.match.params.id)}>Groups</button>
               </span>
               <span>
                <button onClick={() => this.handleMessages(this.props.match.params.id)}>Messages</button>
               </span>
              </nav>
          </div>
          <div className="card-body">
          {state}
          </div>
      </div>
    </div>
     

    );
 }
}}

export default MyProfile;
