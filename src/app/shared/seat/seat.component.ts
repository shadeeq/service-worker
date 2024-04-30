import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Seat, SeatTypeEnum } from "../../core/db/seatMap/seatMap.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.scss'
})
export class SeatComponent {
  @Input({ required: true }) seat!: Seat;
  @Output() onSeatClick = new EventEmitter<Seat>();

  protected readonly SeatTypeEnum = SeatTypeEnum;

  onClick(seat: Seat): void {
    this.onSeatClick.emit(seat);
  }
}
