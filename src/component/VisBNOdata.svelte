<script lang="ts">
    /*Ansvar: 1 formatringen for output der sendes fra ESP8255
    //data tilgås fra App.svelte som en prop.*/
    import type {IBNO} from "../interfaces"

    export let bno:IBNO;
    let k: string[] =Object.keys(bno)
    const snr = (tal:number,dec:number):String=> {
        let factor =Number(Math.pow(10,dec));
        return (Math.round(tal*factor)/factor).toFixed(dec)
    }

    //bygger et array som sendes videre til visning
    $:d= [
        {name:"Kurs", val:snr(Number(bno.kurs), 1)},
        {name:"Kalibrering", val:snr(Number(bno.kal), 0)},
        {name:"Fluxgate", val:snr(Number(bno.rawkurs), 1)},
        {name:"Roll", val:snr(Number(bno.roll), 2)},
        {name:"Pitch", val:snr(Number(bno.pitch), 2)},
        //{name:"Kurs",val:snr(Number(gps.lat) ,5)},
        //{name:"Fart",val:snr(Number(gps.lat) ,5)},
    ];

</script>
    <h3>Gyro data</h3>
    <span>
        {#each d as elm}
            <ul>
                <li><strong>{elm.name}</strong></li>
                <li>{elm.val}</li>
            </ul>
        {/each}
        </span>
<style>

ul {
    display: inline-block;
    margin: 0;
    padding: 0;
    width: auto;
}
li {
  display: block;
  margin-right: 10px;
  text-align: center;
  text-decoration: none;
}
h3{
    text-align: left;
    margin: 0;
}
</style>   
    