import { Injectable } from '@angular/core';
import { SeatMap } from "../db/seatMap/seatMap.model";
import { of } from "rxjs";
import { liveQuery } from "dexie";
import { seatMapDb } from "../db/seatMap/seatMap.db";

@Injectable({
  providedIn: 'root'
})
export class SeatMapService {

  seatMap: SeatMap = {
    seatRows : [
      {
      "row" : [ {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 1,
        "column" : "A",
        "seatType" : "UP_FRONT",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : false,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 1,
        "column" : "B",
        "seatType" : "UP_FRONT",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : false,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 1,
        "column" : "C",
        "seatType" : "UP_FRONT",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : false,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 1,
        "column" : " ",
        "seatType" : "NO_SEAT",
        "occupied" : false,
        "aisle" : true,
        "exitRow" : false,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 1,
        "column" : "D",
        "seatType" : "UP_FRONT",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : false,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 1,
        "column" : "E",
        "seatType" : "UP_FRONT",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : false,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 1,
        "column" : "F",
        "seatType" : "UP_FRONT",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : false,
        "chargeable" : true
      } ],
      "exitRow" : false
    }, {
      "row" : [ {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 2,
        "column" : "A",
        "seatType" : "EXTRA_LEG_ROOM",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : true,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 2,
        "column" : "B",
        "seatType" : "EXTRA_LEG_ROOM",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : true,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 2,
        "column" : "C",
        "seatType" : "EXTRA_LEG_ROOM",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : true,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 2,
        "column" : " ",
        "seatType" : "NO_SEAT",
        "occupied" : false,
        "aisle" : true,
        "exitRow" : true,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 2,
        "column" : "D",
        "seatType" : "EXTRA_LEG_ROOM",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : true,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 2,
        "column" : "E",
        "seatType" : "EXTRA_LEG_ROOM",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : true,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 2,
        "column" : "F",
        "seatType" : "EXTRA_LEG_ROOM",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : true,
        "chargeable" : true
      } ],
      "exitRow" : true
    }, {
      "row" : [ {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 3,
        "column" : "A",
        "seatType" : "STANDARD",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : false,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 3,
        "column" : "B",
        "seatType" : "STANDARD",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : false,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 3,
        "column" : "C",
        "seatType" : "STANDARD",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : false,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 3,
        "column" : " ",
        "seatType" : "NO_SEAT",
        "occupied" : false,
        "aisle" : true,
        "exitRow" : false,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 3,
        "column" : "D",
        "seatType" : "STANDARD",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : false,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 3,
        "column" : "E",
        "seatType" : "STANDARD",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : false,
        "chargeable" : true
      }, {
        "type" : "SEAT",
        "pieces" : 0,
        "row" : 3,
        "column" : "F",
        "seatType" : "STANDARD",
        "occupied" : false,
        "aisle" : false,
        "exitRow" : false,
        "chargeable" : true
      } ],
      exitRow : false
    }]
  }

  constructor() {
    this.fetchPanels();
  }

  fetchPanels() {
    of(this.seatMap).subscribe(seatMap=> {
      seatMapDb.seatMap.clear();
     seatMapDb.seatMap.bulkPut(seatMap.seatRows);
    });
  }

  getAll(){
    return liveQuery(() => seatMapDb.seatMap.toArray())
  }

}
