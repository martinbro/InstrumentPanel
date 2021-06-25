<script lang="ts">
import { fly } from 'svelte/transition';
// import {}
export let title:string;


let checked=false;
let rad=1;

</script>

<label> 
    <input class="container" type="checkbox" bind:checked={checked}>
    {title}
</label>
    {#if checked}
        <div class="panel" transition:fly="{{ y: -25, duration: 200 }}">
            <slot></slot>
        </div>
    {/if}

<style>
 
    .panel{
        margin: 0;
        padding: 0 15px 15px 15px;
        background-color: wheat;
    }

</style>
