<script lang="ts">
/*Ansvar: 
	1. etablerer forbindelse til websocket 
	2. Henter data og parser dem til standardformat: JSON obj så værdier er hardkodede som fx. gps.lat
	3. sender filtrerede data ud som props til componenterne
*/
	import Kort from "./component/Kort1.svelte";
	import VisGPSData from "./component/VisGPSdata.svelte";
	import LoggedData from "./component/LoggedData.svelte";
	import VisBNOData from "./component/VisBNOdata.svelte";
	import Indstillinger from "./component/KortInstillinger.svelte";
	import Gyroindstillinger from "./component/Gyrokompas.svelte";
	import WayPoints from "./component/WayPoints.svelte";
	import Styring from "./component/Styring.svelte";
	import Statistik from "./component/Statistik.svelte";

	import type { IGPS,IBNO } from "./Interfaces/interfaces"

	let ws:WebSocket = new WebSocket('ws://192.168.137.1:8000/ws');//Computers mobil netværk
	
	// interface I_DATA{
	// 	name: String,
	// }
	// let passedData:I_DATA;
	
	let gps:IGPS={
		lat: 54.8568430, 
		lng:10.5174850,
		hdop: 0,
		sat: 0,
		// course: 0,
		// speed: 0,
	};
	//let bno1:number[];
	let bno:IBNO={
		kurs: 0.000,
		roll: 0.0,
		pitch: 0.0,
		dt: 0.000,
		kal: 1000,
		rawkurs: 0.0,
		kursGS: 0.0,
		sp: 0.0,
		ror: 0.0,
	};
		
	
	//setup listner 
	const inputMassage = ({data}) => {
	const str:string[] = data.split(",");
	 
	const navn:string = str.shift();

	if(navn ==='gps'){
		if(str.length==6){
			try {
				gps.lat = Number(str[0]);
				gps.lng = Number(str[1]);
				gps.hdop = Number(str[2]);
				gps.sat = Number(str[3]);
				gps.course = Number(str[4]);
				gps.speed = Number(str[5]);	
			} catch (error) {
				console.log(error);
			}
		}
	}

	if(navn == "bno"){ 
		if(str.length==9){
			try {
				bno.kurs = Number(str[0]);
				bno.roll = Number(str[1]);
				bno.pitch = Number(str[2]);
				bno.dt = Number(str[3]);
				bno.kal = Number(str[4]);
				bno.rawkurs = Number(str[5]);
				bno.kursGS = Number(str[6]);
				bno.sp = Number(str[7]);
				bno.ror = Number(str[8]);
				
			} catch (error) {
				console.log(error);
			}			
		}
	}
	
	}
	ws.addEventListener('message', inputMassage)
</script>
<svelte:head>
	<title>Navigations App</title>
</svelte:head>
<main>
	<h1>Navigations App.</h1>
	<div id="gps">
		<VisGPSData  gps={gps} ></VisGPSData>
	</div>
	<div id="gyro">
		<VisBNOData bno = {bno} ></VisBNOData>
	</div>
	<div id="kort">
		<Kort kurs = {bno.kurs} fluxgate={bno.kursGS} rawfluxgate={bno.rawkurs} gps={gps}></Kort>
	</div>
	<div id="loggeddata">
		<LoggedData bno = {bno} ></LoggedData>
	</div>
	<!-- Højre side -->
	<div id="indstillinger">
		<Indstillinger gps = {gps}></Indstillinger>
	</div>
	<div id="gyroindstillinger">
		<Gyroindstillinger ws={ws}></Gyroindstillinger>
	</div>
	<div id="Statistik">
		<Statistik></Statistik>
	</div>
	<div id="Styring">
		<Styring></Styring>
	</div>
	<div id="WayPoints">
		<WayPoints ws={ws}></WayPoints>
	</div>
</main>

<style>
	main {
		/* text-align: center; */
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr auto auto auto  300px 1fr;
		grid-template-rows: auto auto auto auto auto auto;	
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
		grid-row: 3/span 5;
		/* background-color:gold; */
	}
	#loggeddata{
		grid-column: 2 / span 3;
		grid-row: 8/span 5;
		/* background-color:gold; */
	}
	/* Højreside */
	#indstillinger{
		grid-column: 5 / span 1;
		grid-row: 3 ;
		background-color:lightblue;
	}
	#gyroindstillinger{
		grid-column: 5 / span 1;
		grid-row: 4;
		/* background-color:lightgreen; */
	}
	#Statistik{
		grid-column: 5 / span 1;
		grid-row: 5;
		background-color:lightblue;
	}
	#Styring{
		grid-column: 5 / span 1;
		grid-row: 6;
		/* background-color:lightgreen; */
	}
	#WayPoints{
		grid-column: 5 / span 1;
		grid-row: 7;
		background-color:lightblue;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>