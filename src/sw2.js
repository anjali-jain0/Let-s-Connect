

navigator.serviceWorker.ready.then(function(serviceWorker){
	serviceWorker.addEventListener('push',function(event){
		const data=event.data.json();
		serviceWorker.registration.showNotification(data.title,{
			body:'Notification from Mern_Social',
			icon:'http://image.ibb.co/frYOFd/tmlogo.png'
		});
	});
});