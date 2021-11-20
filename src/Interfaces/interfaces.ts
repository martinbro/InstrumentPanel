
interface IGPS{
    lat: number;
    lng: number;
    hdop: number;
    sat: number;
    course?: number;
    speed?: number;
}
interface IROR{
    udl: number;
    afstandWP: number;
    activeWP: number;
    spKurs: number;
    ror: number;
}

interface IBNO{
    kurs: number;
    pitch: number;
    roll: number;
    dt: number;
    kal: number;
    rawkurs?: number;
    kursGS?:number;
    fragmentering?:number;
    sp?:number;
    ror?:number;
    heap?:number;
}

//Til Indst.js
interface IState{
    vis: boolean;
    pos: IPos;
    // kursretning?:number
    color: string;
    radius: number;
    antal: number;
}

interface IPos{
    lat: number;
    lng: number;
}

//anvendes i Kort1.svelte
interface IContainers{
    kurs: any[];
    rawflux: any[];
    flux: any[];
    gps: any[];
    wp: any[];
    icon: any[];
}

export type {IGPS}
export type {IBNO}
export type {IROR}
export type {IState}
export type {IPos}
export type {IContainers}