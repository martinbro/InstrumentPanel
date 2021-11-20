<script lang="ts">
import { now } from "svelte/internal";
// import App from "../App.svelte";

    /*Ansvar: 1 formatringen for output der sendes fra ESP8255
    //data tilgås fra App.svelte som en prop.*/
    import type {IBNO,IGPS} from "../Interfaces/interfaces"

    import {logGyroData,maxAntalGyro,AntalGyro,AntalGps, logGPSData, maxAntalGPS} from "../stores/StatistikStore";
    // let n:number = 0;
    // let x2:number = 0;
    // let sSum:number = 0;
    export let bno:IBNO;
    export let gps:IGPS;

    interface IloggedItem{
        gyrokurs: number;
        // fluxgate: number; 
        // time: number
    }
    interface IloggedItemGPS{
        lat: number;
        lng: number;
        time: number;
        // fluxgate: number; 
        // time: number
    }

    interface IloggedItems extends Array<IloggedItem>{}
    interface IloggedItemsGPS extends Array<IloggedItemGPS>{}

    const formatKurs = (kurs:number):number=>{
        while (kurs<0) {
            kurs += 360;
        }
        while (kurs>360){
            kurs -= 360;
        }
        return kurs;
    }

    let dd:IloggedItems = [];
    let ddGPS:IloggedItemsGPS = [];

    $: antGyro(dd);
    let antGyro = (dd)=>{
        $AntalGyro = dd.length;
    }
    $: antGPS(ddGPS);
    let antGPS = (ddGPS)=>{
        $AntalGps = ddGPS.length;
    }

   
    // $:sletGyroData($logGyroData)
    // let sletGyroData =(logGyroData)=>{
    //     if(!logGyroData) {
    //         console.log("$logGyroData: heeeeeeeeeeeeeeeer",$logGyroData);
    //         let d=[];
    //         dd=d;
    //     }
    // }
    
    $:if(bno.dt!=-1 ){
        if(!$logGyroData){
            dd=[];
            dd=dd;
 
        }else if(dd != undefined && dd.length<$maxAntalGyro){
            dd.push({gyrokurs: formatKurs((bno.kurs))});
            dd=dd;//opdaterer dd i svelte
            console.log('den trikker!!!');
        }
    }
    
    $:if(gps.sat >0 && $logGPSData){
        if(ddGPS != undefined && ddGPS.length<$maxAntalGPS){
            ddGPS.push({lat: gps.lat,lng: gps.lng,time:now()});
            ddGPS=ddGPS;//opdaterer dd i svelte
            console.log('GPS trikker!!!',gps.lat,gps.lng);
        }
    }

    let download_csv =() => {
        let csv = 'Kurs\n';
        dd.forEach(function(row) {
            csv += row.gyrokurs.toFixed(1);
            csv += ";"
            csv += "\n";
        });
        csv = csv.replaceAll(".",",");
        let hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'kurs.csv';
        hiddenElement.click();
    }
    let downloadGPS_csv =() => {
        let csv = 'Tidsstempel (ms);Lat;Lng\n';
        ddGPS.forEach(function(row) {
            csv += row.time;
            csv += ";"
            csv += row.lat.toFixed(6);
            csv += ";"
            csv += row.lng.toFixed(6);
            csv += ";"
            csv += "\n";
        });
        csv = csv.replaceAll(".",",");
        let hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'gps.csv';
        hiddenElement.click();
    }
</script>

<h3>Data logning</h3>
{#if $logGyroData==true}
<button on:click="{download_csv}">Download Kurs-data</button>  
{/if}



{#if $logGPSData==true}
<button on:click="{downloadGPS_csv}">Download GPS-data</button>  
{/if}
      <span>
          {#each dd as elm}
              <ul>
                  <li>{elm.gyrokurs.toFixed(1)}</li>
                
              </ul>
          {/each}
        </span>

      <span>
          {#each ddGPS as elm}
              <ul>
                  <li>{elm.lng.toFixed(6)}, {elm.lat.toFixed(6)}</li>
                
              </ul>
          {/each}
        </span>
  <style>
  

  span {
      display: grid;
      grid-template-columns: repeat(6, auto);
      gap: 0.5em;
  }
  ul {
      /* display: inline-block; */
      margin: 0;
      padding: 0;
      width: auto;
  }
  li {
    display: block;
    /* margin-right: 10px; */
    text-align: center;
    text-decoration: none;
  }
  h3{
      text-align: left;
      margin: 0;
  }
  </style>   
    