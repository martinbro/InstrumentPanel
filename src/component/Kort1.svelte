<script lang="ts">
    import * as L from "leaflet";
    import "leaflet/dist/leaflet.css";
    import type {IPos,IGPS,IState,IContainers} from "../Interfaces/interfaces"
    import {isFixed,fixedLat,fixedLng,
            isVisGyro, isVisFluxgate,isVisRawFluxgate,antalVektorer,
            radius,isVisGPS,antalGPSpos,aktuelAntalGPSpos} from "../stores/indstStore"

    export let kurs:number;
    export let fluxgate:number;
    export let rawfluxgate:number;
    export let gps:IGPS;

    //Konstanter
    const toRad = Math.PI/180;

    //Variable
    let map:any = undefined;
    let startpos:IPos = {lat:54.8568430, lng:10.5174850};
    

    //Håndterer skibets position og retningsvektor 
    $: skibPos =():IPos=>{
        if ($isFixed) return {lat:$fixedLat, lng:$fixedLng};
        else return {lat:gps.lat, lng:gps.lng};
    }

    $: kursState = {
        vis: $isVisGyro,
        pos: skibPos(),
        color:"red",
        radius:$radius/3600,
        //antal:$antalVektorer
    }
    $: fluxState = {
        vis: $isVisFluxgate,
        pos: skibPos(),
        color:"blue",
        radius:$radius/3600*0.9,
        //antal:$antalVektorer
    }
    $: rawfluxState = {
        vis: $isVisRawFluxgate,
        pos: skibPos(),
        color:"purple",
        radius:$radius/3600*0.9,
       // antal: $antalVektorer
    }
    $: gpsState = {
        vis: $isVisGPS,
        pos: {lat:gps.lat, lng:gps.lng},
        color:"gray",
        radius: 0.2,
        //antal:$antalGPSpos
    }

    const containers:IContainers = {
        //Holder et antal streg/cirkelelementer
        kurs:[],
        rawflux:[],
        flux:[],
        gps:[]
    }

    $: updateLine(kurs, kursState, containers.kurs );
    $: updateLine(fluxgate, fluxState, containers.flux);
    $: updateLine(rawfluxgate, rawfluxState, containers.rawflux);
    $: updateCirkel( gpsState, containers.gps);
    
    function updateLine(linje:number,state:IState,container:any[]){
        if(map ==undefined) return; //venter til map er instantieret (første tik)
        let max:number;
        !state.vis? max=0: max= $antalVektorer;
        
        if(max>0) container.push(line(linje,state));
        if(container.length>max)remove(container,max);
 
        if(max>0){
          container[container.length - 1].addTo(map);  
        } 
    }
    
    $:$antalGPSpos,remove(containers.gps,$antalGPSpos)
    //Fællesrecource: Kaldes fra updateLine, UpdateCirkel og $antalGPSpos (responsive)
    function remove(container:any[],max:number) {
        while (container.length>max) {
            if (max <0) max=0;//Sikkerhed: onde input fjernes
            const fjernLinje = container.shift();
            fjernLinje.remove(map)
        }
    }

    function updateCirkel(state:IState,container:any[]){
        if(map ==undefined) return; //venter til map er instantieret (første tik)
        let max:number=0;
        if(state.vis)max = $antalGPSpos;
        if(max>0) container.push(circle(state));
        if(container.length>max)remove(container,max);
        if(max>0){
            $aktuelAntalGPSpos = container.length;
           // console.log("antal gps:",l);
            container[$aktuelAntalGPSpos - 1].addTo(map); 
        } 
    }
    

    const line:L.Polyline= (kurs:number,state:IState) => {
        const pointA = new L.LatLng(state.pos.lat, state.pos.lng);
        const pointB = new L.LatLng( state.pos.lat + state.radius * Math.cos(kurs*toRad), state.pos.lng + (state.radius / Math.cos(state.pos.lat * toRad)) * Math.sin(kurs*toRad))
        let pointList = [pointA, pointB];
        return new L.Polyline(pointList, {
            color:state.color,
            weight: 1.5,
            opacity: 0.5,
            smoothFactor: 1,
        });
    };

    const circle:L.circle = (state:IState)=>{
            return new L.circle([state.pos.lat, state.pos.lng], {
            color: state.color,
            opacity: 0.5,
            fillColor: state.color,
            fillOpacity: 0.3,
            radius: state.radius,
            smoothFactor: 1,
        })
    }

    function createMap(container): any {
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
    
    function mapAction(container): { destroy: () => void; } {
        map = createMap(container);
        map.on("click", function (e): void {
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