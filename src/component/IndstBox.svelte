<script lang="ts">
import { fly } from 'svelte/transition';

export let title:string;
export let notat:string = "";
export let checked:boolean = false;
export let ret:boolean = false;
export let show_ret: boolean = false;

$: handle(checked);
function handle(checked:boolean) {
    if(checked ==false) ret = false;
}


</script>
<div class="flex-container">
    <label style="flex-grow: 1">
    <input class="container"  type="checkbox" bind:checked={checked}>
    {title} 
    <small>{notat}</small>
    </label>
    <!-- <slot   class="left pointer" name="show_ret">
        <span  on:click={()=> ret=!ret}>abc</span>
    </slot> -->
    <div on:click={()=> ret=!ret} hidden={!show_ret} class="left pointer">{!ret?"ret":"gem"}
    </div>
</div>

{#if checked}
    <div class="panel" transition:fly="{{ y: -25, duration: 200 }}">
        <slot ></slot>
    </div>
{/if}
{#if ret}
    <div class="panel" transition:fly="{{ y: -25, duration: 200 }}">
        <slot name="ret"></slot>
    </div>
{/if}



<style>
    .flex-container{
        display: flex;
    }
    .panel{
        margin: 0;
        padding: 0px 0px 0px 18px;
        background-color: lightgray; 
    }
    .left{
    
        text-align: right;
    }

</style>
