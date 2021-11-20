<script lang="ts">
    // import {point,WayPoints,isVisWaypoints,crosshair,hidefixpos} from "../stores/tsStore"
    // import type {IPos} from "../Interfaces/interfaces"
    import IndstBox from "./IndstBox.svelte"
    let p:number = 1;
    let i:number = 0;
    let d:number = 0;
    let kalibRor:number = 0;
    let fart:number = 210;
    // let rev:boolean = true;

    export let ws:WebSocket; 
    // export let wsMotor:WebSocket; 
    // export let hdop:Number;
   
    $: sendP_value(p);
    $: sendI_value(i);
    $: sendKalibRor_value(kalibRor+90);//de 180 skyldes at der trækkes 90 fra i c++ koden
    $: sendFart_value(fart);

    function sendP_value(p:number): void {
        if(ws.readyState != ws.OPEN) return;
        if(p<0) return  //safety

        let m:string = `esp;f${p}`;
        ws.send(m);
    }
    function sendI_value(i:number): void {
        if(ws.readyState != ws.OPEN) return;
        if(i<0) return //safety

        let m:string = `esp;g${i}`;
        ws.send(m);
    }
    function sendD_value(d:number): void {
        if(ws.readyState != ws.OPEN) return;
        if(d<0) return //safety

        let m:string = `esp;h${d}`;
        ws.send(m);
    }
    function sendKalibRor_value(kalibRor:number): void {
        if(ws.readyState != ws.OPEN) return;
        let m:string = `esp;i${kalibRor}`;
        ws.send(m);
    }
    function sendFart_value(fart:number): void {
        if(ws.readyState != ws.OPEN) return;
        let m:string = `esp;jb${fart}`;//${rev?'-':''}
        if(Math.abs(fart)<250.01)
        ws.send(m);
    }

</script>
<h2>Styring</h2>
<IndstBox title="Ret P-forstærkning. (P = {p})"> 
    <slot>
        <p>Rorudlæg proportional med kursafvigelse</p>
    <label> 
        <input type=number bind:value={p} step=0.1 min=0 max=10.0>
        <input type=range bind:value={p} step=0.1 min=0 max=10.0>
    </label>
    {#if p < 0}
        <p><small style="color:red">Ulovligt input! K-værdien må min. sættes til 0</small></p>
    {/if}
    </slot>
</IndstBox>
<IndstBox title="Ret I-forstærkning. (I = {i})">
    <slot>
        <p>Rorudlæg proportional med sum af kursafvigelser</p>
        <label> 
            <input type=number bind:value={i} step=0.1 min=0 max=10.0>
            <input type=range bind:value={i} step=0.1 min=0 max=10.0>
        </label>
        {#if i < 0}
            <p><small style="color:red">Ulovligt input! I-værdien må min. sættes til 0</small></p>
        {/if}
    </slot>
</IndstBox>
<IndstBox title="Ret D-forstærkning. (D = {d})">
    <slot>
        <p>ikke implementeret</p>
    </slot>
</IndstBox>
<!-- <IndstBox title="Vis rorudlæg">
    <slot>
        <p>ikke implementeret</p>
    </slot>
</IndstBox> -->
<IndstBox title="Rorkalibrering">
    <p>Bagbord: neg.  Styrbord: pos.</p>
    <label> 
        <input type=number bind:value={kalibRor} step="1" min="-20" max="20">
        <input type=range bind:value={kalibRor} step="1" min="-20" max="20" >
    </label>
</IndstBox>
<IndstBox title="Servicefart i auto-mode.">
    <p>Styresignal til motor:</p>
    <label> 
        <input type=number bind:value={fart} step="10" min="-250" max="250">
        <input type=range bind:value={fart} step="10" min="-250" max="250" >
        {#if fart < -250}
            <p><small style="color:red">Ulovligt input! Farten må min. sættes til -250</small></p>
        {/if}
        {#if fart > 250}
            <p><small style="color:red">Ulovligt input! Farten må max. sættes til 250</small></p>
        {/if}
        <!-- <label >
            Reverse
            <input type="checkbox" bind:checked={rev}>

        </label> -->
    </label>
</IndstBox>

<style>
    h2{
        margin: 0;
        width:11em
    }
</style>