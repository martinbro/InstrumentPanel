<script lang="ts">
import { dataset_dev } from "svelte/internal";

	import Kort from "./component/Kort.svelte"
	import VisData from "./component/VisData.svelte"
	
	/*Ansvar: 
	 1. etablerer forbindelse til websocket 
	 2. sender data ud som props til componenterne*/
	 let ws:WebSocket = new WebSocket('ws://192.168.137.1:8000/ws');//Computers mobil netværk
	
	// interface I_GPS	{//Interface er strengt taget overflødigt da gps, bno skal initialiseres under alle omstændigheder
	// 	gpscourse: number,
	// 	gpsspeed: number,
	// 	hdop: number,
	// 	// kal: number,
	// 	// kurs: number,
	// 	lat: String,
	// 	lng: String,
	// 	// lolationvalid: boolean,
	// 	name: String,
	// 	sat: number
	// }
	// interface I_BNO{
		// 	name: String
		// 	kurs: number,
		// 	kal: number
		// }	
	interface I_DATA{
		name: String,
	}
	let dat:I_DATA;
	let gps={
		gpscourse: 0,
		gpsspeed: 0,
		hdop: 0,
			// kal: 0,
			// kurs: 0,
		lat: "",
		lng: "",
			// lolationvalid: false,
		name: "",
		sat: 0
	};
	let bno={
		kal: 0,
		kurs: 0,
		name: "bno",
	};
		
	//  let dat:any
//setup listner 

	const inputMassage = ({data}) => {
	//ev får automatisk adgang til eventen, der lyttes til
	//samt destructure ev.data til {data} i argumentet
	
	// const {name,lat,lng,hdop,kurs,kal,rawkurs} = JSON.parse(data); //destructure igen - men nu data elementet'
	dat = JSON.parse(data); //destructure igen - men nu data elementet'
	
	if(dat.name ==='navigation'){
		gps=Object.assign(gps,dat);//Mere performance
		//gps = {...gps,...dat}
		console.log(bno, Object.keys(bno).length);
		console.log(gps, Object.keys(gps).length);
		}
	if(dat.name == "bno"){ //Fast update
// console.log(dat.kurs);
		bno=Object.assign(bno,dat);//Mere performance
		//gps = {...gps,...dat}
		// console.log(b,Object.keys(bno).length);
		}
	}
	ws.addEventListener('message', inputMassage)
</script>

<main>

	<VisData gps={gps} >
		{gps.lat}
	</VisData>
	<VisData gps={bno} >
		{bno.kurs}
	</VisData>
	<Kort></Kort>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	/* h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	} */

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>