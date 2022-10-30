<script lang="ts">
    // import {point} from "../stores/tsStore"
    import {logGyroData,AntalGyro,logGPSData,AntalGps,logAccData} from "../stores/StatistikStore"
    // import type {IPos} from "../Interfaces/interfaces"
    import IndstBox from "./IndstBox.svelte"
    import type {IBNO} from "../Interfaces/interfaces"

    export let bno:IBNO;//læser gyrodata fra skib

    let start =false;
    let i = 1;
    let sumRoll = 0;
    let sumRoll2 = 0;
    let sumPitch = 0;
    let sumPitch2 = 0;
    let init = true
    function toggle() {
        start=!start;
        init = false;
        if(start==true){//Ny sampling, gamle værdier fjernes 
            sumRoll=0;
            sumRoll2=0;
            sumPitch=0;
            sumPitch2=0;
            i=0;
        }
    }

    $:if(bno.dt!=-1 && start){//hvis der læses ny gyrodata
        if(i<21 && start){
            sumRoll=sumRoll+bno.roll
            sumRoll2=sumRoll2+ bno.roll*bno.roll
            sumPitch=sumPitch+bno.pitch
            sumPitch2=sumPitch2+ bno.pitch*bno.pitch
            i++;
            console.log(bno.roll,sumRoll,sumRoll2,i);
            
        } else if(i==21 && start){
            start=false
        }
    }
    
    
</script>
<h2>Statistik</h2>
<IndstBox title="Log Testsejladsdata"  bind:checked="{$logGPSData}">
    <p>Antal samples: n={$AntalGps}</p>
</IndstBox>
<IndstBox title="Log Gyrokompasdata"  bind:checked="{$logGyroData}">
    <p>Antal samples: n={$AntalGyro} </p>
</IndstBox>

<IndstBox title="Log Krængningsdata"  bind:checked="{$logAccData}">
    <p><small>Roll, Pitch: {bno.roll}&deg;, {bno.pitch}&deg; </small></p>
    <button on:click={toggle}>Lav ny data-sampling</button>
    <hr>
    {#if !init}
    <p>antal samplinger: {i-1}</p>
    <p>Roll middel: {Math.round(sumRoll/i*100)/100}&deg; , &sigma;={Math.round(Math.sqrt((sumRoll2  - sumRoll*sumRoll/i)/(i))*1000)/1000}&deg;</p>
    <p>Pitch middel: {Math.round(sumPitch/i*100)/100}&deg; , &sigma;={Math.round(Math.sqrt((sumPitch2 - sumPitch*sumPitch/i)/(i))*1000)/1000}&deg;</p>
    <p>.</p>
    {:else}
    <!-- <p>Roll:{bno.roll}&deg;  Pitch:{bno.pitch}&deg;</p> -->
    <p>Antal samplinger: 0</p>
    <p>Roll middel: 0.00&deg; , &sigma;=0.000&deg;</p>
    <p>Pitch middel: 0.00&deg; , &sigma;=0.000&deg;</p>
    <p>.</p>
    {/if}
</IndstBox>



<style>
    h2{
        margin: 0;
        width:11em
    }
</style>