<script lang="ts">
import {
    isFixed,fixedLat,fixedLng,
    isVisGyro, isVisFluxgate,isVisRawFluxgate,
    radius,antalVektorer,
    isVisGPS,antalGPSpos,aktuelAntalGPSpos,point,hidefixpos} from "../stores/indstStore"
import type {IGPS} from "../Interfaces/interfaces"
import IndstBox from "./IndstBox.svelte"

export let gps:IGPS;
let showRetPos=false;

$: antalMeter = Math.round($radius*1852/60*10)/10;
$: $isFixed, fixPos();

$: $point, setPoint();
function setPoint() {
    // $fixedLng = $point.lng;
    if($isFixed && $hidefixpos){
        $fixedLat = $point.lat/1;
        $fixedLng = $point.lng/1;
        $hidefixpos = false;
    }
    console.log($point.lat,$point.lng,$fixedLat,$fixedLng);
    
}

let fixPos = ()=>{
    if($isFixed && $fixedLng==0){
        $fixedLat = gps.lat;
        $fixedLng = gps.lng;

    }
}
</script>
<!-- <head><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></head> -->
<!-- *************************************************************************************************************** -->

<h2>Kort indstillinger</h2>
<IndstBox title="Vis Gyrokompas" bind:checked="{$isVisGyro}" ></IndstBox>
<IndstBox title="Vis Fluxgate" bind:checked="{$isVisFluxgate}"  ></IndstBox>
<IndstBox title="Vis Fluxgate (ikke stabiliseret)" bind:checked="{$isVisRawFluxgate}"  ></IndstBox>

<IndstBox title="Fasthold position" show_ret="{$isFixed?true:false}" bind:ret="{$hidefixpos}" bind:checked = "{$isFixed}">

    <div slot ="ret">
        <small>

        <p>Indtast bredde og længde</p>
        <label>
            <span>Lat:</span> 
            <input type="number" step=0.00001 bind:value="{$fixedLat}">
        </label>
        <label>
            <span>Lng:</span>     
            <input type="number" step=0.00001 bind:value="{$fixedLng}">
        </label>
                        
        </small>
        <hr>
    </div>
</IndstBox>

<IndstBox title="Antal viste vektorer">
    <label>
        <p>Antal vektorer der skal vises:</p> 
        <input type=number bind:value={$antalVektorer} min=1 max=100>
        <input type=range bind:value={$antalVektorer} min=1 max=100>
    </label>
 </IndstBox>

<IndstBox title="Vektorlængde">
    <label>
        <p>Længde af vektor i buesekunder:</p> 
        <input type=number bind:value={$radius} min=1 max=60>
        <input type=range bind:value={$radius} min=1 max=60>
    </label>
    <p>længden: {antalMeter}m</p>
</IndstBox>

<IndstBox title="Vis GPS position" bind:checked={$isVisGPS}>
    <label>
        <p>Max. antal viste positioner:</p> 
        <input type=number bind:value={$antalGPSpos} min=1 max=1000>
        <input type=range bind:value={$antalGPSpos} min=1 max=1000>
    </label>
    <p><small>Aktuel antal viste GPS pos.: {$aktuelAntalGPSpos}</small> </p>
</IndstBox>
 
<!-- ***************************************************************************************** -->

<style>
    /* span{
        display: block;
        width: 40px;
    } */

    span{
        display: inline-block;
        width:2em;  
    }

  
    h2{
        margin: 0;
        width:11em
    }



    p{
        margin: 0;
        padding: 0;
    }

    
</style>