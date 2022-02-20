<script lang="ts">
// import { fly } from 'svelte/transition';
// import {} from "../stores/GyrokompasStore"
//import type {IGPS} from "../Interfaces/interfaces"
import IndstBox from "./IndstBox.svelte"

export let ws:WebSocket; 

let opdatefrek:number = 50;
let k: number = 0.99;
let misvisning:number = 3.75;

$:sendOpdateringsRaten(opdatefrek);
$:sendK_værdi(k);
$:sendMisvisning(misvisning)

function sendOpdateringsRaten(opdatefrek:number):void {
    if(ws.readyState != ws.OPEN) return;

    let n:number = Math.round(1000/opdatefrek);//Min. er 20 ms = 50Hz  og Max. 1000 ms = 1Hz(jf. skærmens opdateringstid)
    
    if(0<opdatefrek) {//safety
        if(n < 17) return;//Pjat at opdatere hurtigere end 60Hz
        let m:string = `esp;b${n}`;      
        ws.send(m);
    }
}

function sendK_værdi(k:number): void {
    if(ws.readyState != ws.OPEN) return;

    if(k<0) return  //safety
    if(1<k) return  //safety

    let m:string = `esp;c${k}`;
    ws.send(m);
}

function sendMisvisning(misvisning:number): void {
    if(ws.readyState != ws.OPEN) return;
    
    if(misvisning<-30) return  //safety
    if(30<misvisning) return  //safety

    let m:string = `esp;d${misvisning/1.0}`;
    ws.send(m);
}

</script>

<!-- *************************************************************************************************************** -->

<h2>Gyrokompas</h2>
<IndstBox title="Ret Opdateringsfrekvens" >
    <p>Ret antal opdateringer pr. sek.</p>
    <label> 
        <input type=number bind:value={opdatefrek} min=1 max=50 >
        <input type=range bind:value={opdatefrek} min=1 max=50 >
    </label>
    {#if 50 < opdatefrek }
        <p><small style="color:red">Ulovligt input! Frekvensen er for stor</small></p>
    {:else if opdatefrek < 1}
        <p><small style="color:red">Ulovligt input! Frekvensen er for lille</small></p>
    {:else}
        <p><small>Tid mellem opdateringer {Math.round(1000/opdatefrek)} ms</small></p>
    {/if}
</IndstBox>

<IndstBox title="Ret K-værdi" >
    <p>Procentdel gyroen vægter i forhold til fluxgate</p>
    <label> 
        <input type=number bind:value={k} step=0.01 min=0 max=1.00>
        <input type=range bind:value={k} step=0.01 min=0 max=1.00>
    </label>
    {#if 1 <k }
        <p><small style="color:red">Ulovligt input! K-værdien må max. sættes til 1</small></p>
    {:else if k < 0}
        <p><small style="color:red">Ulovligt input! K-værdien må min. sættes til 0</small></p>
    {:else}
        <p><small>K-værdi {Math.round(k)} ms</small></p>
    {/if}
</IndstBox>
<IndstBox title="Ret Misvisning">
    <p>E: positiv, W: negativ</p>
    <label> 
        <input type=number bind:value={misvisning} step="0.25" min="-10" max="10">
        <input type=range bind:value={misvisning} step="0.25" min="-10" max="10" >
    </label>
</IndstBox>

<!-- ***************************************************************************************** -->

<style>
    h2{
        margin: 0;
        width:11em
    }

    p{
        margin: 0;
        padding: 0;
    }
    
</style>