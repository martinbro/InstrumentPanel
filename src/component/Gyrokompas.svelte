<script lang="ts">
import { fly } from 'svelte/transition';
import {opdatefrek} from "../stores/GyrokompasStore"
//import type {IGPS} from "../Interfaces/interfaces"
import IndstBox from "./IndstBox.svelte"

export let ws:WebSocket;

// $: antalMeter = Math.round($radius*1852/60*10)/10;
// $: $isFixed, fixPos();

// let fixPos = ()=>{
//     if($isFixed){
//         $fixedLat = gps.lat;
//         $fixedLng = gps.lng;
//     }
// }
$: $opdatefrek, sendRatenTilGyro()

function sendRatenTilGyro() {
     if(ws.readyState == ws.OPEN){
        let n:number = Math.round(1000/$opdatefrek);//Min. er 20 ms = 50Hz  og Max. 1000 ms = 1Hz(jf. skærmens opdateringstid)
        
        if(n<20) return;
        if(1000<n) return;
        let m:string = `esp:,,${n},`;

        console.log(m);
        ws.send(m);
        
    } 
}
</script>

<!-- *************************************************************************************************************** -->

<h2>Gyrokompas indstillinger</h2>
<IndstBox title="Opdateringsfrekvens" >
    <p>Ret opdateringsfrekvensen, (Antal opdteringer pr. sek).</p>
    <label> 
        <input type=number bind:value={$opdatefrek} min=1 max=50>
        <input type=range bind:value={$opdatefrek} min=1 max=50>
    </label>
    <p><small>Tid mellem opdateringer {Math.round(1000/$opdatefrek)} ms</small></p>
</IndstBox>


 
<!-- ***************************************************************************************** -->

<style>
    h2{
        margin: 0;
        width:11em
    }

    span{
        display: inline-block;
        width:2em;  
    }

    .panel{
        margin: 0;
        padding: 0 15px 15px 15px;
        background-color: wheat;
    } 
    p{
        margin: 0;
        padding: 0;
    }
    
</style>