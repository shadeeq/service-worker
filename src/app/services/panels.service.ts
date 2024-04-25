import { Injectable } from '@angular/core';
import { of } from "rxjs";
import { Panel } from "../db/panels/panel.model";
import { panelsDb } from "../db/panels/panels.db";
import { liveQuery } from "dexie";

@Injectable({
  providedIn: 'root'
})
export class PanelsService {

  panels: Panel[] = [
    {
      id : "1",
      order: 3,
      show: 1,
      name: 'Panel A'
    },
    {
      id : "2",
      order: 1,
      show: 1,
      name: 'Panel B'
    },
    {
      id : "3",
      order: 2,
      show: 1,
      name: 'Panel C'
    },
    {
      id : "4",
      order: 4,
      show: 0,
      name: 'Panel D'
    },
  ];

  constructor() {
    this.fetchPanels();
  }

  fetchPanels() {
    of(this.panels).subscribe(panels=> {
      panelsDb.panels.bulkAdd(panels);
    });
  }

  getAll() {
    return liveQuery(() =>
      panelsDb.panels
        .where('show')
        .equals(1)
        .sortBy('order')
    );
  }

  getPanelById(panelId: string) {
    return liveQuery(() =>
      panelsDb.panels
        .where('id')
        .equals(panelId)
        .first()
    );
  }
}
