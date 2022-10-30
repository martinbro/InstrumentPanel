<script lang="ts">
    import { now } from "svelte/internal";
    // import App from "../App.svelte";

    /*Ansvar: 1 formatringen for output der sendes fra ESP8255
    //data tilgås fra App.svelte som en prop.*/
    import type { IBNO, IGPS } from "../Interfaces/interfaces";
    import type { IROR } from "../Interfaces/interfaces";

    export let ror: IROR;

    import {
        logGyroData,
        maxAntalGyro,
        AntalGyro,
        AntalGps,
        logGPSData,
        maxAntalGPS,
    } from "../stores/StatistikStore";
    // let n:number = 0;
    // let x2:number = 0;
    // let sSum:number = 0;
    export let bno: IBNO;
    export let gps: IGPS;
    interface IloggedItem {
        time: number;
        gyrokurs: number;
        // fluxgate: number;
        // time: number
    }
    interface IloggedItemGPS {
        lat: number;
        lng: number;
        kurs: number;
        speed: number;
        time: number;
        gyrokurs: number;
        kursToWP: number;
        DistToGo: number;
        udlaeg: number;
        minRoll:number;
        maxRoll:number;

        // fluxgate: number;
        // time: number
    }
    interface IloggedMeanVal {
        minRoll: number;
        maxRoll: number;

        // fluxgate: number;
        // time: number
    }

    interface IloggedItems extends Array<IloggedItem> {}
    interface IloggedItemsGPS extends Array<IloggedItemGPS> {}


    const formatKurs = (kurs: number): number => {
        while (kurs < 0) {
            kurs += 360;
        }
        while (kurs > 360) {
            kurs -= 360;
        }
        return kurs;
    };

    let dd: IloggedItems = [];
    let ddGPS: IloggedItemsGPS = [];
    

    $: antGyro(dd);
    let antGyro = (dd) => {
        $AntalGyro = dd.length;
    };
    $: antGPS(ddGPS);
    let antGPS = (ddGPS) => {
        $AntalGps = ddGPS.length;
    };
    let maxRoll:number = -90;
    let minRoll:number = 90;

    $: if (bno.dt != -1) {
        if (!$logGyroData) {
            dd = [];
            dd = dd;
        } else if (dd != undefined && dd.length < $maxAntalGyro) {
            dd.push({ time: now(), gyrokurs: formatKurs(bno.kurs) });
            dd = dd; //opdaterer dd i svelte
            // console.log('den trikker!!!');
        }
    }
    $: if (bno.dt != -1 && $logGPSData){
            if(maxRoll<bno.roll){maxRoll=bno.roll;}
            if(minRoll>bno.roll){minRoll=bno.roll;}
    }

    // let oldTime: number = 0;
    let gpsTime: string = "";
    
    $: if (gps.sat > 0) {
        if (!$logGPSData) {
            ddGPS = [];
            gpsTime=gps.time;
            // oldTime = Math.floor(Date.now()/1000);
            ddGPS = ddGPS;
        } else if (ddGPS != undefined && ddGPS.length < $maxAntalGPS) {
            // const t: number = Number.parseInt(gps.time.trim());
            // const t: number = Math.floor(Date.now()/100);
            // if(oldTime<Date.now()){
                // oldTime = Date.now();
                if ( gpsTime != gps.time) {
                    gpsTime = gps.time;
                    console.log("gps.time",gps.time.trim());
                    
                    ddGPS.push({
                        lat: gps.lat,
                        lng: gps.lng,
                        time: Math.floor(Date.now()/1000),
                        speed: gps.speed,
                        kurs: gps.course,
                        gyrokurs: formatKurs(bno.kurs),
                        kursToWP: formatKurs(ror.spKurs),
                        DistToGo: ror.afstandWP,
                        udlaeg: ror.ror,
                        minRoll:minRoll,
                        maxRoll:maxRoll,
                    });
                    minRoll=90;
                    maxRoll=-90;

                    ddGPS = ddGPS; //opdaterer dd i svelte
                    // console.log('GPS trikker!!!',gps.lat,gps.lng,gps.speed,gps.course);
                }
            }
        // }
    }

    let download_csv = () => {
        let csv = "Tidsstempel (ms);Kurs\n";
        dd.forEach(function (row) {
            csv += row.time - dd[0].time;
            csv += ";";
            csv += row.gyrokurs.toFixed(2);
            csv += ";";
            csv += "\n";
        });
        csv = csv.replaceAll(".", ",");
        let hiddenElement = document.createElement("a");
        hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
        hiddenElement.target = "_blank";
        hiddenElement.download = "kurs.csv";
        hiddenElement.click();
    };
    let downloadGPS_csv = () => {
        let csv =
            "Tidsstempel (s);Lat;Lng;SOG(m/s);COG;Heading;Kurs til WP;DTG;rudder angle; min roll; max roll\n";
        ddGPS.forEach(function (row) {
            csv += (row.time - ddGPS[0].time).toFixed(0);
            csv += ";";
            csv += row.lat.toFixed(7);
            csv += ";";
            csv += row.lng.toFixed(7);
            csv += ";";
            csv += row.speed.toFixed(1);
            csv += ";";
            csv += row.kurs.toFixed(2);
            csv += ";";
            csv += row.gyrokurs.toFixed(2);
            csv += ";";
            csv += row.kursToWP.toFixed(2);
            csv += ";";
            csv += row.DistToGo.toFixed(1);
            csv += ";";
            csv += row.udlaeg.toFixed(1);
            csv += ";";
            csv += row.minRoll.toFixed(1);
            csv += ";"
            csv += row.maxRoll.toFixed(1);
            csv += ";"
            csv += "\n";
        });
        csv = csv.replaceAll(".", ",");
        let hiddenElement = document.createElement("a");
        hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
        hiddenElement.target = "_blank";
        hiddenElement.download = "gps.csv";
        hiddenElement.click();
    };
</script>

<h3>Data logning</h3>
{#if $logGyroData == true}
    <button on:click={download_csv}>Download Kurs-data</button>
{/if}

{#if $logGPSData == true}
    <button on:click={downloadGPS_csv}>Download GPS-data</button>
{/if}
<span>
    {#each dd as elm}
        <ul>
            <li>{elm.gyrokurs.toFixed(1)}</li>
        </ul>
    {/each}
</span>

<span>
    {#each ddGPS as elm}
        <ul>
            <li>{elm.lng.toFixed(6)}, {elm.lat.toFixed(6)}</li>
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
    h3 {
        text-align: left;
        margin: 0;
    }
</style>
