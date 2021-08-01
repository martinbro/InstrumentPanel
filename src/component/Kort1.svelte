<script lang="ts">
    import * as L from "leaflet";
    import "leaflet/dist/leaflet.css";
    import type {IPos,IGPS,IState,IContainers} from "../Interfaces/interfaces"
    import {isFixed,fixedLat,fixedLng,
            isVisGyro, isVisFluxgate,isVisRawFluxgate,antalVektorer,
            radius,isVisGPS,antalGPSpos,aktuelAntalGPSpos,
            point,hidefixpos, crosshair,
            WayPoints,isVisWaypoints,antalWayPoints
            } from "../stores/tsStore"

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
    $: skibPos =():IPos=> {
        if ($isFixed) return {lat:$fixedLat, lng:$fixedLng};
        else return {lat:gps.lat, lng:gps.lng};
    }
    $: $isVisWaypoints, visWP()
    let visWP = ()=>{
        if(!$isVisWaypoints) remove(containers.wp,0);
        else plotWP()
    }
    $: $WayPoints,plotWP()
    let plotWP=():void=>{
        if(map ==undefined) return; //venter til map er instantieret (første tik)
        //Hvis $WayPoints ændre sig - ifm. tilføjelse eller redigering:
        //1. først fjernes alle 'gamle' wp
        remove(containers.wp,0);
        let max:number;
        let wpState = {
        vis: $isVisWaypoints,
        pos: {lat:0,lng:0},
        color:"green",
        radius: 0.2,
        antal:$antalWayPoints
    }
        !wpState.vis? max=0: max= $WayPoints.length;
        $WayPoints.forEach(p => {
            wpState.pos=p;
            if(max>0){
                containers.wp.push(circle(wpState));
                containers.wp[containers.wp.length - 1].addTo(map); 
            } 
        });
        
    }
    $: kursState = {
        vis: $isVisGyro,
        pos: skibPos(),
        color:"red",
        radius:$radius/3600,
        antal:$antalVektorer
    }
    $: fluxState = {
        vis: $isVisFluxgate,
        pos: skibPos(),
        color:"blue",
        radius:$radius/3600*0.9,
        antal:$antalVektorer
    }
    $: rawfluxState = {
        vis: $isVisRawFluxgate,
        pos: skibPos(),
        color:"purple",
        radius:$radius/3600*0.9,
        antal: $antalVektorer
    }
    $: gpsState = {
        vis: $isVisGPS,
        pos: {lat:gps.lat, lng:gps.lng},
        color:"gray",
        radius: 0.2,
        antal:$antalGPSpos
    }

    const containers:IContainers = {
        //Holder et antal streg/cirkelelementer
        kurs:[],
        rawflux:[],
        flux:[],
        gps:[],
        wp:[]
    }

    $: updateVektor(kurs, kursState, containers.kurs );
    $: updateVektor(fluxgate, fluxState, containers.flux);
    $: updateVektor(rawfluxgate, rawfluxState, containers.rawflux);
    $: UpdateCirkel( gpsState, containers.gps);
    // $: UpdateCirkel( wpState, containers.wp);
    
    $:$antalGPSpos,remove(containers.gps,$antalGPSpos)
    // $:$antalVektorer,remove(containers.kurs,$antalVektorer)//kun nødvendig ved lave opdateringstider
    // $:$antalVektorer,remove(containers.flux,$antalVektorer)//kun nødvendig ved lave opdateringstider
    // $:$antalVektorer,remove(containers.rawflux,$antalVektorer)//kun nødvendig ved lave opdateringstider
    $: $aktuelAntalGPSpos = containers.gps.length;//tæller antal punkter

    function updateVektor(linje:number,state:IState,container:any[]){
        if(map ==undefined) return; //venter til map er instantieret (første tik)
        let max:number;
        !state.vis? max=0: max= state.antal;
        
        if(max>0) container.push(line(linje,state));
        if(container.length>max)remove(container,max);
 
        if(max>0){
          container[container.length - 1].addTo(map);  
        } 
    }
    
    

    //Fællesrecource: Kaldes fra updateLine, UpdateCirkel og $antalGPSpos (responsive)
    function remove(container:any[],max:number) {
        while (container.length>max) {
            if (max <0) max=0;//Sikkerhed: onde input fjernes
            const fjernLinje = container.shift();
            fjernLinje.remove(map)
        }
    }


    function UpdateCirkel(state:IState,container:any[]){
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
        let m = L.map(container).setView([startpos.lat, startpos.lng], 18.5);
        let CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            maxZoom: 21
        });
        CartoDB_Voyager.addTo(m);
        let Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; Esri',
            maxZoom: 17
        });
        Esri_WorldImagery.addTo(m);
        // let OpenSeaMap = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
        //     attribution: ' &copy; OpenSeaMap'
        // });
        // OpenSeaMap.addTo(m);
       
        return m;
    }
    let state = true;
    function mapAction(container): { destroy: () => void; } {
        map = createMap(container);
        map.on("click", function (e): void {
            const coord = e.latlng.toString().split(",");
            const lat = coord[0].split("(");
            const lng = coord[1].split(")");

            $point = {lat:lat[1].trim(),lng:lng[0].trim()}
            
            // if($setWayPoints){
            //         $WayPoints=[...$WayPoints,$point];                    
            // }
        });
        return {
            destroy: () => {map.remove();}
        };
    }

</script>


<div id="kort" class:crosshair="{$crosshair || $hidefixpos}" style="height:600px;width:800px" use:mapAction />
<style>
.crosshair {cursor: crosshair;}
</style>