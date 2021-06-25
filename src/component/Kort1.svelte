<script lang="ts">
    import * as L from "leaflet";
    import "leaflet/dist/leaflet.css";
    import type { ILinjeSegment,IPos,IGPS} from "../Interfaces/interfaces"
    import {isFixed,fixedLat,fixedLng} from "../stores/indstStore"

    export let kurs:number;
    export let fluxgate:number;
    export let rawfluxgate:number;

    export let gps:IGPS;

    //Konstanter
    const toRad = Math.PI/180;

    //Tegner kort og gennerelle variable
    let map = undefined;
    let startpos:IPos = {lat:54.8568430, lng:10.5174850};


    //Håndterer skibets position og retningsvektor 
    $: skibPos =():IPos=>{
        if ($isFixed) return {lat:$fixedLat, lng:$fixedLng};
        else return {lat:gps.lat, lng:gps.lng};
    }


    $: kursState = {
        pos: skibPos(),
        color:"red",
        radius:1/3600
    }
    $: fluxState = {
        pos: skibPos(),
        color:"blue",
        radius:1/3600*0.9
    }
    $:  rawfluxState = {
        pos: skibPos(),
        color:"yellow",
        radius:1/3600
    }
    
    const linjer = {
        kurs:[],
        rawflux:[],
        flux:[]
    }

    $: updateLine(kurs,kursState,linjer.kurs);
    $: updateLine(fluxgate,fluxState,linjer.flux,1);
    $: updateLine(rawfluxgate,rawfluxState,linjer.rawflux,1);
    
    function updateLine(linje,kursstate:ILinjeSegment,holder,max = 1){
        if(map ==undefined) return; //venter til map er instantieret (første tik)
        
        if(max>0) holder.push(line(linje,kursstate))
        while (holder.length>max) {
            const fjernLinje = holder.shift();
            fjernLinje.remove(map)
        }
        if(max>0) holder[holder.length - 1].addTo(map);
    }
    
    const line:L.Polyline= (kurs:number,ks:ILinjeSegment) => {
        const pointA = new L.LatLng(ks.pos.lat, ks.pos.lng);
        const pointB = new L.LatLng( ks.pos.lat + ks.radius * Math.cos(kurs*toRad), ks.pos.lng + (ks.radius / Math.cos(ks.pos.lat * toRad)) * Math.sin(kurs*toRad))
        let pointList = [pointA, pointB];
        return new L.Polyline(pointList, {
            color:ks.color,
            weight: 1.5,
            opacity: 0.5,
            smoothFactor: 1,
        });
    };
    
    function createMap(container) {
        let m = L.map(container).setView([startpos.lat, startpos.lng], 19);
        L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
            {   attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
                &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
                subdomains: 'abcd',
                maxZoom: 25,
            }
        ).addTo(m);
       
        return m;
    }
    
    function mapAction(container) {
        map = createMap(container);
        map.on("click", function (e) {
            if(true){
                const coord = e.latlng.toString().split(",");
                const lat = coord[0].split("(");
                const lng = coord[1].split(")");
                const point={lat:lat[1].trim(),lng:lng[0].trim()}
                console.log("You clicked the map at pos: ", point);

                // $WPoints=[...$WPoints,point]
            }
        });
        return {
            destroy: () => {map.remove();}
        };
    }

</script>


<div id="kort" style="height:600px;width:800px" use:mapAction />
<style>

</style>