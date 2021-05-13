<script lang="ts">
//Ansvar formatringen for output der sendes fra ESP8255
//data skal nok parses fra App.svelte som en prop. store er vel egenlig ikke nødvendig?
export let gps;

</script>
<h2>{Math.round(gps.lat*100)/1000000000}</h2>
<p>
    <slot></slot>
</p>
