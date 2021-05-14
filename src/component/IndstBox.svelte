<script lang="ts">
import { fly } from 'svelte/transition';
export let title:string;
let checked=false;
let rad=1;

</script>

<label> 
    <input class="container" type="checkbox" bind:checked={checked}>
    {title}
</label>
    {#if checked}
        <div class="panel" transition:fly="{{ y: -5, duration: 200 }}">
            <slot></slot>
        </div>
    {/if}

<style>
 
    #box{
        margin: 0px;
        display: inline-block;
        border-style:solid;
        border-width: 1px;
        padding: 5px 20px;
        background-color:lightgray;
        width: 30px;
        text-align: center;

    }
    h2{
        margin: 0;
        width:11em
    }

    span{
        display: inline-block;
        width:2em;  
    }
    hr {
        border: 1px solid white;
        border-top: 1px solid grey;
    }
    .panel{
        margin: 0;
        padding: 0 15px 15px 15px;
        background-color: wheat;
    }
    p{
        margin: 0;
        padding: 0;
    }
    .wp input{
        display: inline-block;
        width: 115px;
    }
    
</style>
