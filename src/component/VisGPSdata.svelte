<script lang="ts">
    /*Ansvar: 1 formatringen for output der sendes fra ESP8255
    //data tilgås fra App.svelte som en prop. ?*/
    import type { IGPS } from "../interfaces"

    export let gps:IGPS;
    type feline = typeof gps;
    

    
</script>
    

        <h2><slot></slot></h2>
        <p>{gps.lat}</p>
    
    