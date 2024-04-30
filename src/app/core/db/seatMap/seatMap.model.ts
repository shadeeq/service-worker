export interface SeatMap{
  seatRows: Rows[],
}
export interface Rows{
  id?: number,
  row: Seat[],
  exitRow : boolean
}
export interface Seat {
  type : string,
  pieces : number,
  row : number,
  column : string,
  seatType : SeatType,
  occupied : boolean,
  aisle : boolean,
  exitRow : boolean,
  chargeable : boolean
}

type SeatType = "NO_SEAT" | "STANDARD" | "EXTRA_LEG_ROOM" | "UP_FRONT";

export enum SeatTypeEnum {
  NO_SEAT = 'NO_SEAT',
  STANDARD = 'STANDARD',
  EXTRA_LEG_ROOM = 'EXTRA_LEG_ROOM',
  UP_FRONT = 'UP_FRONT',
}
