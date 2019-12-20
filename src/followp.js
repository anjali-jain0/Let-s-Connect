import { useState, useEffect } from "react";
import {
	isSupported,
	sendNotification,
	register,
	createNotification
	} from './sw';


const supported = isSupported();

export default function useNotification(){

	useEffect(() => {
		if(supported){
			register();
		}
	},[]);
}

const Subscribe = () => {
	createNotification()
	.then(function)
}



