import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Rows, Seat } from "../../core/db/seatMap/seatMap.model";
import { SeatComponent } from "../seat/seat.component";

@Component({
  selector: 'app-seat-map',
  standalone: true,
  imports: [
    SeatComponent
  ],
  templateUrl: './seat-map.component.html',
  styleUrl: './seat-map.component.scss'
})
export class SeatMapComponent{
  @Input({ required: true }) seatMap: Rows[] = [];
  @Output() seatClick = new EventEmitter<Seat>()

  onSeatClick(seat: Seat){
    console.log(seat)
    this.seatClick.emit(seat)
  }
}
