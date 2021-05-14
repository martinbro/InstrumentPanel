<script lang="ts">
    /*Ansvar: 1 formatringen for output der sendes fra ESP8255
    //data tilgås fra App.svelte som en prop.*/
    import type {IGPS} from "../interfaces"

    export let gps:IGPS;
    let k: string[] =Object.keys(gps)
    const snr = (tal:number,dec:number):String=> {
        let factor =Number(Math.pow(10,dec));
        return (Math.round(tal*factor)/factor).toFixed(dec)
    }

    //bygger et array som sendes videre til visning
    $:d= [
        {name:"Længde gr.", val:snr(Number(gps.lat)/10000000, 6)},
        {name:"Bredde gr.", val:snr(Number(gps.lng)/10000000, 6)},
        {name:"HDOP", val:snr(Number(gps.hdop), 1)},
        {name:"Sat", val:snr(Number(gps.sat), 0)},
        //{name:"Kurs",val:snr(Number(gps.lat) ,5)},
        //{name:"Fart",val:snr(Number(gps.lat) ,5)},
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
    