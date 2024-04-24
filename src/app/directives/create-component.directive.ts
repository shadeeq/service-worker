import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { Panel } from "../models/panel.model";
import { COMPONENTS_LIST_MAP } from "../constants/components-list";

@Directive({
  selector: '[appCreateComponent]',
  standalone: true,
})
export class CreateComponentDirective implements OnInit {
  @Input('appCreateComponent') panelsList: Panel[] = [];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.viewContainerRef.clear();
    void this.loadPanels();
  }

  loadPanels = async () => {
    for (const panel of this.panelsList) {
      const loadComponentFn = COMPONENTS_LIST_MAP.get(panel.id);
      if (loadComponentFn) {
        const component = await loadComponentFn();
        this.viewContainerRef.createComponent(component);
        this.cdr.markForCheck();
      }
    }
  }
}
