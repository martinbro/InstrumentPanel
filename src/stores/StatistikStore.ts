import {Writable, writable} from 'svelte/store';
//import type {IPos}from "../Interfaces/interfaces"

export let logGyroData: Writable<boolean> = writable(false);
export let maxAntalGyro: Writable<number> = writable(1000);//default
export let AntalGyro: Writable<number> = writable(0);//default

//export let mean: Writable<number> = writable(0);//default
//export let sigma: Writable<number> = writable(0);//default
// export let GyroData: Writable<number[]>= writable([]);//default;

export let logGPSData: Writable<boolean> = writable(false);
export let maxAntalGPS: Writable<number> = writable(1000);//default
export let AntalGps: Writable<number[]>= writable([]);//default;






