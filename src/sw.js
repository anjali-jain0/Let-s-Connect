var webpush=require('web-push');

const publicKey='BKgPEG-yxGjEwubcob9tfvgfOkqjJW9EPe60SDiaJNo_EudTYOMZGkjdVP9wzVUJOCcmecelw4OKbHu-tcw2p4Y';
const privateKey='TwccAFnxAS8ftEkyEqpfpuTtthaxwBOOvI4q9yxpHQo';

webpush.setVapidDetails('mailto:test@test.com',publicKey,privateKey);


function isSupported() {
	 return 'serviceWorker' in navigator && 'PushManager' in window;
}

function sendNotification(){
	// navigator.serviceWorker.ready.then(function(serviceWorker){
	// 	serviceWorker.addEventListener('push',function(event){
	// 		const data=event.data.json();
	// 		serviceWorker.registration.showNotification(data.title,{
	// 			body:'Notification Example',
	// 			icon:'http://image.ibb.co/frYOFd/tmlogo.png'
	// 		});
	// 	});
	// });
	const subscription=createNotification();
	//res.status(201).json({});
	const payload=JSON.stringify({title:'Push Test'});
	return webpush.sendNotification(subscription,payload);
}

function register(){
	return navigator.serviceWorker.register('./sw2.js');
}

function createNotification(){
	const serviceWorker = await navigator.serviceWorker.ready;
	return await serviceWorker.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array(publicKey)
        });
}

urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


export {
	isSupported,
	sendNotification,
	register,
	createNotification
}
