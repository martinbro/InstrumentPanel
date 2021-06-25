<script lang="ts">
    /*Ansvar: 1 formatringen for output der sendes fra ESP8255
    //data tilgås fra App.svelte som en prop.*/
    import type {IGPS} from "../Interfaces/interfaces"
    

    export let gps:IGPS;

    //bygger et array som sendes videre til visning
    $:d= [
        {name:"Længde gr.", val:gps.lat.toFixed(6)},
        {name:"Bredde gr.", val:gps.lng.toFixed(6)},
        {name:"HDOP", val:gps.hdop.toFixed(1)},
        {name:"Sat", val:gps.sat},
        //{name:"Kurs",val:gps.course},
        //{name:"Fart",val:gps.speed},
    ];

</script>
<h3>GPS data</h3>
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
    