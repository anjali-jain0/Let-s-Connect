console.log('Service Worker Loaded..')

self.addEventListener('push',function(event){

	const data=event.data.json();
	console.log('push received')
	self.registration.showNotification(data.title,{
		body:'Mern Social Notification',
		icon:'http://image.ibb.co/frYOFd/tmlogo.png'
	});
});