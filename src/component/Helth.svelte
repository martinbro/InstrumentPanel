<script lang="ts">
    /*Ansvar: 1 formatringen for output der sendes fra ESP8255
    //data tilgås fra App.svelte som en prop.*/
    import type {IBNO} from "../Interfaces/interfaces"

    export let bno:IBNO;
    // export let frag:number;

    let k: string[] =Object.keys(bno);
    // let clock:number = 0;
    // $: clock= (frag>0 || clock>0)?clock=160:0

    const formatKurs = (kurs:number):number=>{
        while (kurs<0) {
            kurs += 360;
        }
        while (kurs>360){
            kurs -= 360;
        }
        // if (frag != 0) {clock = 160;}
        return kurs;
    }

    //bygger et array som sendes videre til visning
    $:d=[
        // {name:"Heap", val:bno.heap},
        // {name:"Fragmentering", val:frag+"%"},
        {name:"Clock MHz", val:160 + "MHz"}
        // {name:"Fluxgate", val:formatKurs(bno.rawkurs).toFixed(1)},
        // {name:"Roll", val:bno.roll.toFixed(2)},
        // {name:"Pitch", val:bno.pitch.toFixed(2)},

    ];

</script>
    <h3>PLC ydeevne</h3>
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
    