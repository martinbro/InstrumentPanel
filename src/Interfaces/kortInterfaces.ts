
interface LinjeSegmentI{
    startPos: StartPosI;
    color: string;
    radius: number;
}
interface StartPosI{
    lat: number;
    lng: number;
}

export type {LinjeSegmentI}
