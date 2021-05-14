
interface IGPS{
    gpscourse: number;
    gpsspeed: number;
    hdop: number;
    lat: string;
    lng: string;
    name: string;
    sat: number;
}
interface IBNO{
    dt: number;
    kal: number;
    kurs: number;
    name: string;
    pitch: number;
    rawkurs: number;
    roll: number;
}
export type {IGPS}
export type {IBNO}