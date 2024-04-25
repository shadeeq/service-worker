import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "./pages/layout/layout.component";
import { SwService } from "./services/sw.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'sidebar-worker';

  constructor(
    private readonly swService: SwService,
  ) {
  }

  ngOnInit(): void {
    this.swService.checkForUpdate();
  }

}
