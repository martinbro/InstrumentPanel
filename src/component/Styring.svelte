<script lang="ts">
    // import {point,WayPoints,isVisWaypoints,crosshair,hidefixpos} from "../stores/tsStore"
    // import type {IPos} from "../Interfaces/interfaces"
    import IndstBox from "./IndstBox.svelte"
</script>
<h2>Styring</h2>
<IndstBox title="P-værdi"> 
    <slot>
    </slot>
</IndstBox>
<IndstBox title="I-værdi">
    <slot>
    </slot>
</IndstBox>
<IndstBox title="D-værdi">
    <slot>
    </slot>
</IndstBox>

<style>
    h2{
        margin: 0;
        width:11em
    }
</style>