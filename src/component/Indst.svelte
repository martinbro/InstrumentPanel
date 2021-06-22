<script lang="ts">
import { fly } from 'svelte/transition';
import IndstBox from "./IndstBox.svelte"

let rad:number = 1;
let FastholdFlag:boolean = false;
let isVektorLaengde:boolean = false;

$: antalMeter = Math.round(rad*1852/60*10)/10;

</script>

<h2>Kort indstillinger</h2>

<IndstBox title="Fasthold position">
    <label>
        <p>Bredde og Længde:</p>
        <span>Lat: </span> 
        <input type="number"  step=0.00001 >
    </label>
    <label>
        <span>Lng:</span>     
        <input type="number" step=0.00001  >
    </label>
</IndstBox>
<IndstBox title="Vis fluxgate kompas">
    <label>
        <p>Antal vektorer der vises</p> 
        <input type=number bind:value={rad} min=1 max=100>
        <input type=range bind:value={rad} min=1 max=100>
    </label>
    <!-- <p>længden: m</p> -->
</IndstBox>
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
    }
    .panel{
        margin: 0;
        padding: 0 15px 15px 15px;
        background-color: wheat;
    } */
    p{
        margin: 0;
        padding: 0;
    }
    /* .wp input{
        display: inline-block;
        width: 115px;
    } */
    
</style>