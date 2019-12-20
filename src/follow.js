import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Worker from './worker2';

class Follow extends Component {

   constructor(){
    super();
    this.state={
      user:''
    }
  }

  componentWillMount(){
    
    fetch('/user')
    .then(res => res.json())
    .then(data => this.setState({user:data}));
    
  }

  handleClick = (id) => {
    
   const whofollowed = this.props.usr_id;

   // if('serviceWorker' in navigator){
   //    console.log('Registering SW...');
   //    console.log(navigator.serviceWorker);
   //    const register = await navigator.serviceWorker.register('./worker2.js');
   //    console.log('here2 : ' + register);
   //      console.log('SW is registered...');
   //      console.log('Register Subscription...');
   //      // const subscription=register.pushManager.subscribe({
   //      // userVisibleOnly:true,
   //      // applicationServerKey:this.urlBase64ToUint8Array(this.state.publicKey)
   //      // });
      
   //      console.log('Push notification...');
        fetch('/followed/' + id + '/' + whofollowed)
        //,{
      //   method:'POST',
      //   body:JSON.stringify(subscription),
      //   headers:{
      //     'content-type':'application/json'
      //   }
      // });
    //}

  }


   render() { 
    var user=this.state.user;
    var id = this.props.usr_id ; 

    return (
    <div>
      <ul className="collection">
      { user && user.map(usr => {
      if(usr._id !== id){
        return (
            <li className="collection-item avatar">
              <img src={usr.img} alt="" className="circle" />
              <span className="title">{usr.name}</span>
              <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              <NavLink to={'/userprofile/' + usr._id}><button class="btn btn-outline-warning">View Profile</button></NavLink>
              <button class="btn btn-outline-success" onClick={() => this.handleClick(usr._id)} > Follow </button>
            </li>
          ) }})}
      </ul>
    </div>
  );
}

}

      
export default Follow;

