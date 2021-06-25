<script lang="ts">
import { fly } from 'svelte/transition';
import {isFixed,isVisFluxgate,fixedLat,fixedLng} from "../stores/indstStore"
import type {IGPS} from "../Interfaces/interfaces"
// import { fix_position } from 'svelte/internal';
import IndstBox from "./IndstBox.svelte"

export let gps:IGPS;

let rad:number = 1;
// let isFastholdPos:boolean = false;
let isVektorLaengdeChecked:boolean = false;

$: antalMeter = Math.round(rad*1852/60*10)/10;
let updatePos = ()=>{
    
}
$: $isFixed, fixPos();

let fixPos = ()=>{
    if($isFixed){
        $fixedLat = gps.lat;
        $fixedLng = gps.lng;
    }
}

</script>

<h2>Kort indstillinger</h2>

<label> 
    <input class = "container" type = "checkbox" bind:checked = "{$isFixed}">
    Fasthold position
</label>
    {#if $isFixed}
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
    {/if}

<!-- BOX NR 2 ******************************************* -->

<label> 
    <input class = "container" type = "checkbox" bind:checked = "{$isVisFluxgate}">
    Vis Fluxgatekompas
</label>
    {#if $isVisFluxgate}
        <div class = "panel" transition:fly ="{{ y: -25, duration: 200 }}">
            <label>
                <p>Antal vektorer der vises</p> 
                <input type=number bind:value={rad} min=1 max=100>
                <input type=range bind:value={rad} min=1 max=100>
            </label>
        </div>
    {/if}


<IndstBox title="Vektorlængde">
    <label>
        <p>Længde af vektor i buesekunder:</p> 
        <input type=number bind:value={rad} min=1 max=60>
        <input type=range bind:value={rad} min=1 max=60>
    </label>
    <p>længden: {antalMeter}m</p>
</IndstBox>
 

<!-- ************************************************************************************* -->
<!-- <hr> -->
<style>

    /* #box{
        margin: 0px;
        display: inline-block;
        border-style:solid;
        border-width: 1px;
        padding: 5px 20px;
        background-color:lightgray;
        width: 30px;
        text-align: center;

    } */
    h2{
        margin: 0;
        width:11em
    }

    span{
        display: inline-block;
        width:2em;  
    }
    /* hr {
        border: 1px solid white;
        border-top: 1px solid grey;
    }*/
    .panel{
        margin: 0;
        padding: 0 15px 15px 15px;
        background-color: wheat;
    } 
    p{
        margin: 0;
        padding: 0;
    }
    /* .wp input{
        display: inline-block;
        width: 115px;
    } */
    
</style>