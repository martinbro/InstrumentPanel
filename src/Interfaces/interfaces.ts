
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

//Til Indst.js
interface ILinjeSegment{
    pos: IPos;
    color: string;
    radius: number;
}

interface IPos{
    lat: number;
    lng: number;
}

// interface IState {
//     pos: IPos;
//     color: string;
//     radius: number;
// }

export type {IGPS}
export type {IBNO}
export type {ILinjeSegment}
export type {IPos}
// export type {IState}