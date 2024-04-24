import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { Panel } from "../models/panel.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  panels: Panel[] = [
    {
      id : "1",
      order: 3,
      show: true,
      name: 'Panel A'
    },
    {
      id : "2",
      order: 1,
      show: true,
      name: 'Panel B'
    },
    {
      id : "3",
      order: 2,
      show: true,
      name: 'Panel C'
    },
    {
      id : "4",
      order: 4,
      show: false,
      name: 'Panel D'
    },
  ];

  getPanels(): Observable<Panel[]> {
    return of(this.panels);
  }

  getPanelById(panelId: string): Observable<Panel | undefined> {
    return of(this.panels.find(panel => panel.id === panelId));
  }
}
