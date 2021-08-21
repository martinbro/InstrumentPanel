<script lang="ts">
    /*Ansvar: 1 formatringen for output der sendes fra ESP8255
    //data tilgås fra App.svelte som en prop.*/
    import type {IBNO} from "../Interfaces/interfaces"

    import {logGyroData,maxAntalGyro} from "../stores/StatistikStore";
    // let n:number = 0;
    // let x2:number = 0;
    // let sSum:number = 0;
    export let bno:IBNO;

    interface IloggedItem{
        gyrokurs: number;
        // fluxgate: number; 
        // time: number
    }
    interface IloggedItems extends Array<IloggedItem>{}
    const formatKurs = (kurs:number):number=>{
        while (kurs<0) {
            kurs += 360;
        }
        while (kurs>360){
            kurs -= 360;
        }
        return kurs;
    }
    let dd:IloggedItems = [];

    $:console.log("$logGyroData:",$logGyroData);
    
    
    $:if(bno.dt!=-1 && $logGyroData){
        
        if(dd != undefined && dd.length<$maxAntalGyro){
            dd.push({gyrokurs: formatKurs((bno.kurs))});
            dd=dd;//opdaterer dd i svelte
            console.log('den trikker!!!');
        }
    }

    let download_csv =() => {
    var csv = 'Name,Title\n';
    dd.forEach(function(row) {
            csv += row.gyrokurs.toFixed(2);
            csv += ";"
            csv += "\n";
    });
    csv = csv.replaceAll(".",",");
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'gps.csv';
    hiddenElement.click();
}
</script>

<h3>Data logning</h3>
<button on:click="{download_csv}">Download</button>
      <span>
          {#each dd as elm}
              <ul>
                  <li>{elm.gyrokurs}</li>
                  <!-- <li>{elm.fluxgate}</li> -->
                  <!-- <li>{elm.time}</li> -->
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
    