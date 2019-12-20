import React, { Component } from 'react';


class Worker extends Component {


   constructor(){
    super();
    this.state={
     
    }
  }


 componentWillMount(){
		console.log('Service Worker Loaded..');

	if(navigator.serviceWorker){

		navigator.serviceWorker.addEventListener('push',function(event){
			console.log('here1');
			const data=event.data.json();
			navigator.serviceWorker.registration.showNotification(data.title,{
				body:'Notification from Mern_Social',
				icon:'http://image.ibb.co/frYOFd/tmlogo.png'
			});
		});
	}
}

    render() {
    	return (
    		<div></div>
    		)
    }


}

export default Worker;