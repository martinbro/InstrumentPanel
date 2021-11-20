<script lang="ts">
    /*Ansvar: 1 formatringen for output der sendes fra ESP8255
    //data tilgås fra App.svelte som en prop.*/
    // import type {IROR} from "../Interfaces/interfaces"
    import type { IROR } from "../Interfaces/interfaces"
    import {activeWP } from "../stores/tsStore"

    export let ror:IROR;
    $:$activeWP = ror.activeWP
    //bygger et array som sendes videre til visning
    $:d= [
        {name:"Ror", val:Math.round(ror.udl)},
        {name:"Kurs", val:formatKurs(ror.spKurs).toFixed(1)},
        {name:"Dist WP", val:ror.afstandWP},//.toFixed(6)},
        // {name:"error", val:ror.ror},
    ];
    const formatKurs = (kurs:number):number=>{
        while (kurs<0) {
            kurs += 360;
        }
        while (kurs>360){
            kurs -= 360;
        }
        return kurs;
    }
</script>
<h3>Styring</h3>
    <span>
        {#each d as elm}
            <ul>
                <li><strong>{elm.name}</strong></li>
                <li>{elm.val}</li>
            </ul>
        {/each}
    </span>
<style>
span {
    display: grid;
    grid-template-columns: auto auto auto auto auto;
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
    