<script lang="ts">
    // import {point} from "../stores/tsStore"
    import {logGyroData} from "../stores/StatistikStore"
    // import type {IPos} from "../Interfaces/interfaces"
    import IndstBox from "./IndstBox.svelte"

    
</script>
<h2>Statistik</h2>
<IndstBox title="Log gyrokompasdata"  bind:checked="{$logGyroData}">
    <p>Antal samples: n=</p>
</IndstBox>


<style>
    h2{
        margin: 0;
        width:11em
    }
</style>