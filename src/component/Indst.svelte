<script lang="ts">
import { fly } from 'svelte/transition';
import {
    isFixed,fixedLat,fixedLng,
    isVisGyro, isVisFluxgate,isVisRawFluxgate,
    radius,antalVektorer,
    isVisGPS,antalGPSpos,aktuelAntalGPSpos} from "../stores/indstStore"
import type {IGPS} from "../Interfaces/interfaces"
import IndstBox from "./IndstBox.svelte"

export let gps:IGPS;

$: antalMeter = Math.round($radius*1852/60*10)/10;
$: $isFixed, fixPos();

let fixPos = ()=>{
    if($isFixed){
        $fixedLat = gps.lat;
        $fixedLng = gps.lng;
    }
}
</script>

<!-- *************************************************************************************************************** -->

<h2>Kort indstillinger</h2>
<IndstBox title="Vis Vektorer" >
    <label> 
        <input class = "container" type = "checkbox" bind:checked = "{$isVisGyro}">
        Vis Gyrokompas
    </label>
    <label> 
        <input class = "container" type = "checkbox" bind:checked = "{$isVisFluxgate}">
        Vis Fluxgate
    </label>
    <label> 
        <input class = "container" type = "checkbox" bind:checked = "{$isVisRawFluxgate}">
        Vis Fluxgate (ikke stabiliseret)
    </label>
</IndstBox>

<IndstBox title="Fasthold position" bind:checked = "{$isFixed}">
    <div class = "panel" transition:fly ="{{ y: -25, duration: 200 }}">
        <label>
            <p>Indtast bredde og længde</p>
            <span>Lat: </span> 
            <input type="number" step=0.00001 bind:value="{$fixedLat}">
        </label>
        <label>
            <span>Lng:</span>     
            <input type="number" step=0.00001 bind:value="{$fixedLng}">
        </label>
    </div>
</IndstBox>

<IndstBox title="Antal viste vektorer">
    <!-- <div class = "panel" transition:fly ="{{ y: -25, duration: 200 }}"> -->
        <label>
            <p>Antal vektorer der skal vises:</p> 
            <input type=number bind:value={$antalVektorer} min=1 max=100>
            <input type=range bind:value={$antalVektorer} min=1 max=100>
        </label>
        <!-- </div> -->
</IndstBox>

<IndstBox title="Vektorlængde">
    <label>
        <p>Længde af vektor i buesekunder:</p> 
        <input type=number bind:value={$radius} min=1 max=60>
        <input type=range bind:value={$radius} min=1 max=60>
    </label>
    <p>længden: {antalMeter}m</p>
</IndstBox>
<hr>
<IndstBox title="Vis GPS position" bind:checked={$isVisGPS}>
    <label>
        <p>Max. antal viste positioner:</p> 
        <input type=number bind:value={$antalGPSpos} min=1 max=1000>
        <input type=range bind:value={$antalGPSpos} min=1 max=1000>
    </label>
    <p> <small>Aktuel antal viste GPS pos.: {$aktuelAntalGPSpos}</small> </p>
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