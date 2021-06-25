import { writable } from 'svelte/store';

//export let isFastholdt = writable(false);
export let isFixed = writable(false);
export let fixedLat = writable(54.8568430);//default
export let fixedLng = writable(10.5174850);//default


export let isVisFluxgate = writable(false);