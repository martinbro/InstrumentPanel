<script lang="ts">
    import {point,WayPoints,isVisWaypoints,crosshair,hidefixpos,rwp} from "../stores/tsStore"
    import type {IPos} from "../Interfaces/interfaces"
    import IndstBox from "./IndstBox.svelte"

    export let ws:WebSocket; 
    $: sendR_værdi($rwp);
    function sendR_værdi(r:number): void {
        if(ws.readyState != ws.OPEN) return;

        if(r<0) return  //safety

        let m:string = `esp;e${r}`;
        ws.send(m);
    }
    function sendWP():void {
    if(ws.readyState != ws.OPEN) return;

    // if($WayPoints.length>0) {//safety
        let m:string = `esp;a`;      
        $WayPoints.forEach(wp => {
            m = m + wp.lng +":" + wp.lat +","
        });
        console.log('sender',m);
        
        ws.send(m);
    // }
    
}
    // export let gps:IGPS;
    // let showRetPos=false;
   
    $: $point, setPoint();
    function setPoint() {
        if(setWP && $isVisWaypoints)addWPList($point)
        console.log("Besked fra set WP: ",$point.lat,$point.lng);
        // sendWP();
        
    }
    $: $hidefixpos, sluk();
    function sluk() { setWP=false}
    
    $: $isVisWaypoints, isVisWaypoint();
    let isVisWaypoint = ()=>{
        if($isVisWaypoints==false)setWP = false;
        // else setWP = true;
        
    }
    let setWP:boolean = false;
    let isWPret:number = -1;
    let setLat:number = 0;
    let setLng:number = 0;
    let addWPList=(point:IPos)=>{
        if(isWPret<0){
           if($WayPoints.length<10){
               $WayPoints = [...$WayPoints,point];//Tilføjer WP
               
        
           } 

        } 
        else{//retter eksisterende WP
            let a = $WayPoints;
            a[isWPret]=point;
            $WayPoints = a;
            
        }
    }
    let tilføj:boolean = false;
    $:{
        if(isWPret<0)  $crosshair=false
        else{
            $crosshair=true;
          
        } 
    }
    $:{
        if(setWP && $isVisWaypoints) $crosshair=true
        else {
            $crosshair=false;
        };
    }
    $: $WayPoints, opdaterWP();
    function opdaterWP():void {
        console.log('opdaterer wp: ',$WayPoints);
        if(isWPret==-1)sendWP();
        
    }

    // $:console.log("isWPret:", isWPret);

    let sletItem=(nr:number)=> { 
        let a= $WayPoints;
         a.splice(nr,1);
        $WayPoints = a;
        console.log('sletItem',nr,a);
        
        // $WayPoints=a;
    }
    let opd = ()=>{
        isWPret=-1;
        sendWP();
    }
    </script>

    <!-- <head><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></head> -->
    <!-- *************************************************************************************************************** -->
    
    <h2>Waypoints</h2>
    
    <IndstBox title="Vis waypoints"  bind:checked = "{$isVisWaypoints}">
        <label>
            <input type="checkbox" on:click="{()=>isWPret=-1}"  bind:checked ="{setWP}">
            Tilføj/rediger waypoints
        </label>
        {#if setWP}
            {#if $WayPoints.length == 10}
            <p class="maxantal">max antal waypoints er nået!</p> 
            {/if}
            {#each $WayPoints as wp,i }
                <p>
                    <small>wp {i+1}: {Number(wp.lat).toFixed(6)}{wp.lat>0?"N":"S"} {Number(wp.lng).toFixed(6)}{wp.lng>0?"E":"W"}
                        {#if isWPret<0}
                            <span class="right" on:click={()=>{sletItem(i)}}> slet</span>
                            <span class="right">&nbsp;/&nbsp;</span>
                        {/if} 
                        <span class="right ret" on:click={()=>isWPret==i?opd():isWPret=i}>{isWPret==i?"gem":"ret"}</span> 
                    </small>
                </p>
                {#if isWPret == i}
                    <small>
                        <p>Indtast bredde og længde</p>
                        <label>
                            <span>Lat:</span> 
                            <input type="number" step=0.000001 bind:value="{$WayPoints[i].lat}">
                        </label>
                        <label>
                            <span>Lng:</span>     
                            <input type="number" step=0.000001 bind:value="{$WayPoints[i].lng}">
                        </label>
                    </small>
                    <hr>
                {/if}
            
            {/each}
        {:else}   
            {#each $WayPoints as wp,i }
            <p>
                <small>wp {i+1}: {Number(wp.lat).toFixed(6)}{wp.lat>0?"N":"S"} {Number(wp.lng).toFixed(6)}{wp.lng>0?"E":"W"}
                    <!-- {#if isWPret<0}
                        <span class="right" on:click={()=>{sletItem(i)}}> slet</span>
                        <span class="right">&nbsp;/&nbsp;</span>
                    {/if}  -->
                    <!-- <span class="right ret" on:click={()=>isWPret==i?isWPret=-1:isWPret=i}>{isWPret==i?"stop rediger":"ret"}</span>  -->
                </small>
            </p>        
            {/each}
        {/if}
       
    </IndstBox>
    <IndstBox title="Ret radius til WP: {$rwp} m" >
        <p>Acceptabel afstand til waypoint i meter</p>
        <label> 
            <input type=number bind:value={$rwp} step=1 min=0 max=50>
            <input type=range bind:value={$rwp} step=1 min=0 max=50>
        </label>
        {#if $rwp < 0}
            <p><small style="color:red">Ulovligt input! radius kan ikke være under 0m</small></p>
        {/if}
    </IndstBox>
    
    <!-- ***************************************************************************************** -->
    
<style>
    /* span{
        display: block;
        width: 40px;
    } */
    .right{
        float: right;
    }

    .right:hover{
        text-decoration: underline;
    }
    .maxantal{
        color: red;
    }
    span{
        display: inline-block;
        /* width:1.5em;   */
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