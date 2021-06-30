import { writable } from 'svelte/store';

export let isFixed = writable(false);
export let fixedLat = writable(54.8568430);//default
export let fixedLng = writable(10.5174850);//default

export let radius = writable(1);//default 1 buesek

export let isVisGyro = writable(true);
export let isVisFluxgate = writable(false);
export let isVisRawFluxgate = writable(false);
export let antalVektorer = writable(1);

export let isVisGPS = writable(false);
export let antalGPSpos = writable(1000);
export let aktuelAntalGPSpos = writable(0);