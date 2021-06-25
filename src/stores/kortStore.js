import { writable } from 'svelte/store';

export const fastholdPos = writable(true);
export const skibPos = writable({
    lat:54.8568430,
    lng:10.5174850
}
);
