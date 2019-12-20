const publicKey='BKgPEG-yxGjEwubcob9tfvgfOkqjJW9EPe60SDiaJNo_EudTYOMZGkjdVP9wzVUJOCcmecelw4OKbHu-tcw2p4Y';

if('serviceWorker' in navigator){
	send().catch(function(err){
		console.log('error');
	});
}

async function send()
{
	console.log('Registering SW...');
	const register= await navigator.serviceWorker.register('./worker.js',{
		scope:'/'
	});
    console.log('SW is registered...');
    console.log('Register Subscription...');

	const subscription = await register.pushManager.subscribe({
		userVisibleOnly:true,
		applicationServerKey:urlBase64ToUint8Array(publicKey)
	});
	
	//console.log(urlBase64ToUint8Array(publicKey));
	//console.log(subscription);

    console.log('Push notification...');
    console.log('Sending push');
    console.log(JSON.stringify(subscription));
	await fetch('/subscribe',{
		method:'POST',
		body:JSON.stringify(subscription),
		headers:{
			'Content-Type':'application/json'
		}
	});
	console.log('push sent');
}

function urlBase64ToUint8Array(base64String) {
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
