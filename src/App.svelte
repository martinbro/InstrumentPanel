<script lang="ts">
/*Ansvar: 
	1. etablerer forbindelse til websocket 
	2. Henter data og parser dem til standardformat: JSON obj så værdier er hardkodede som fx. gps.lat
	3. sender filtrerede data ud som props til componenterne
*/
	import Kort from "./component/Kort.svelte";
	import VisGPSData from "./component/VisGPSdata.svelte";
	import type { IGPS } from "./interfaces"
	
	let ws:WebSocket = new WebSocket('ws://192.168.137.1:8000/ws');//Computers mobil netværk
	
	interface I_DATA{
		name: String,
	}
	let passedData:I_DATA;
	
	let gps:IGPS={
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
		
	
	//setup listner 
	const inputMassage = ({data}) => {
	//ev får automatisk adgang til eventen, der lyttes til
	//samt destructure ev.data til {data} i argumentet
	
	// const {name,lat,lng,hdop,kurs,kal,rawkurs} = JSON.parse(data); //destructure igen - men nu data elementet'
	passedData = JSON.parse(data); //destructure igen - men nu data elementet'
	
	if(passedData.name ==='navigation'){
		gps=Object.assign(gps,passedData);//Mere performance
		//gps = {...gps,...dat}
		console.log(bno, Object.keys(bno).length);
		console.log(gps, Object.keys(gps).length);
		}
	if(passedData.name == "bno"){ //Fast update
// console.log(dat.kurs);
		bno=Object.assign(bno,passedData);//Mere performance
		//gps = {...gps,...dat}
		// console.log(b,Object.keys(bno).length);
		}
	}
	ws.addEventListener('message', inputMassage)
</script>

<main>

	<VisGPSData gps={gps} >
		{gps.lat}
	</VisGPSData>
	<!-- <VisData gps={bno} >
		{bno.kurs}
	</VisData> -->
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