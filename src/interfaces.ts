
interface IGPS{
    lat: number;
    lng: number;
    hdop: number;
    sat: number;
    course?: number;
    speed?: number;
}
interface IBNO{
    kurs: number;
    pitch: number;
    roll: number;
    dt: number;
    kal: number;
    rawkurs?: number;
    kursGS?:number;
    sp?:number;
    ror?:number;
}

export type {IGPS}
export type {IBNO}