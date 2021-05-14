<script lang="ts">
/*Ansvar: 
	1. etablerer forbindelse til websocket 
	2. Henter data og parser dem til standardformat: JSON obj så værdier er hardkodede som fx. gps.lat
	3. sender filtrerede data ud som props til componenterne
*/
	import Kort from "./component/Kort.svelte";
	import VisGPSData from "./component/VisGPSdata.svelte";
	import VisBNOData from "./component/VisBNOdata.svelte";
	import Indstillinger from "./component/Indst.svelte";
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
		dt: 0.006,
		kal: 3033,
		kurs: -1095.919,
		name: "bno",
		pitch: -0.669804,
		rawkurs: -1094.175,
		roll: 0.748573,
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
	<h1>Navigations App.</h1>
	<div id="gps">
		<VisGPSData  gps={gps} ></VisGPSData>
	</div>
	<div id="gyro">
		<VisBNOData bno={bno} ></VisBNOData>
	</div>
	<div id="kort">
		<Kort></Kort>
	</div>
	<div id="dashb">
		<Indstillinger></Indstillinger>
	</div>
</main>

<style>
	main {
		/* text-align: center; */
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr auto auto auto  auto 1fr;	
		gap: 1em;
	}
	
	h1 {
		grid-column: 2 / span 2;
		/* background-color: navy; */
		margin: auto 0 0 0;
		text-align: left;
	}
	#gps{
		grid-column: 2 / span 1;
		/* background-color:red; */
	}
	#gyro{
		grid-column: 3 / span 1;
		/* background-color:burlywood; */
		
	}
	#kort{
		grid-column: 2 / span 3;
		background-color:gold;
	}
	#dashb{
		grid-column: 5 / span 1;
		background-color:lightblue;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>