<script lang="ts">
    /*Ansvar: 1 formatringen for output der sendes fra ESP8255
    //data tilgås fra App.svelte som en prop.*/
    import type {IBNO} from "../Interfaces/interfaces"

    export let bno:IBNO;
    let k: string[] =Object.keys(bno)


    const formatKurs = (kurs:number):number=>{
        while (kurs<0) {
            kurs += 360;
        }
        while (kurs>360){
            kurs -= 360;
        }
        return kurs;
    }

    //bygger et array som sendes videre til visning
    $:d=[
        {name:"Gyrokurs", val:formatKurs((bno.kurs)).toFixed(1)},
        {name:"Kalibrering", val:bno.kal},
        {name:"Fluxgate", val:bno.rawkurs.toFixed(1)},
        {name:"Roll", val:bno.roll.toFixed(2)},
        {name:"Pitch", val:bno.pitch.toFixed(2)},
        {name:"dt", val:bno.dt.toFixed(3)},

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
span {
    display: grid;
    grid-template-columns: repeat(6, auto);
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
    