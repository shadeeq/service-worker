import { Component } from '@angular/core';
import { from, tap } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { SeatMapService } from "../../../core/services/seat-map.service";
import { SeatMapComponent } from "../../../shared/seat-map/seat-map.component";

@Component({
  selector: 'app-seatmap-demo',
  standalone: true,
  imports: [
    AsyncPipe,
    SeatMapComponent
  ],
  templateUrl: './seatmap-demo.component.html',
  styleUrl: './seatmap-demo.component.css'
})
export class SeatmapDemoComponent {

  seatMap$ = from(this.seatMapService.getAll()).pipe(
    tap(r => console.log(r))
  );

  constructor(
    private readonly seatMapService: SeatMapService
  ) {}

}
