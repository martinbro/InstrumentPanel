
interface IGPS{
    gpscourse: number;
    gpsspeed: number;
    hdop: number;
    lat: string;
    lng: string;
    name: string;
    sat: number;
}
export type {IGPS}