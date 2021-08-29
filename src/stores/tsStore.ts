import { Writable, writable } from 'svelte/store';
import type {IPos}from "../Interfaces/interfaces"
export let isFixed:Writable<boolean> = writable(false);
export let fixedLat:Writable<number> = writable(54.850798);//default  
export let fixedLng:Writable<number> = writable(10.510236);//default

export let crosshair:Writable<boolean> = writable(false);

export let radius:Writable<number> = writable(1);//default 1 buesek

export let isVisGyro:Writable<boolean> = writable(true);
export let isVisFluxgate:Writable<boolean> = writable(false);
export let isVisRawFluxgate:Writable<boolean> = writable(false);
export let antalVektorer:Writable<number> = writable(1);

export let isVisGPS:Writable<boolean> = writable(false);
export let antalGPSpos:Writable<number> = writable(1000);
export let aktuelAntalGPSpos:Writable<number> = writable(0);

export let point: Writable<IPos> = writable({lat:0.0,lng:0.0});
export let hidefixpos:Writable<boolean> = writable(false);

export let isVisWaypoints:Writable<boolean> = writable(false);
export let antalWayPoints:Writable<number> = writable(10);
export let WayPoints:Writable<IPos[]> = writable([]);
export let rwp:Writable<number> = writable(5);//radius til WP i meter.
