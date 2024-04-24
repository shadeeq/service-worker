import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../reusable-components/sidebar/sidebar.component";
import { AsyncPipe } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationPopupComponent } from "../../reusable-components/confirmation-popup/confirmation-popup.component";
import { environment } from "../../../environments/environment";
import { DataService } from "../../services/data.service";
import { IndexedDbService } from "../../services/indexed-db.service";

export interface Item {
  id: string,
  order: number,
  show: boolean,
  route?: string
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SidebarComponent,
    AsyncPipe,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainComponent implements OnInit{

  constructor(
    private readonly dialog: MatDialog,
    private readonly dataService: DataService,
    private readonly indexedDbService: IndexedDbService
  ) {
  }

  showPopup(){
    if (environment.showPopups){
      const dialogRef =  this.dialog.open(ConfirmationPopupComponent,
        {
          height: '100px',
          width: '200px',
        })
      dialogRef.afterClosed().subscribe((x: any) => {
        console.log('CONFIRM:', x)
      })
    } else {
      console.log('SHOWPOPUPS ARE SET TO FALSE')
    }

  }

  ngOnInit() {
    // this.dataService.getPanels()
    //   .subscribe(r => {
    //     this.addData('panels', r)
    //     this.getAllData()
    //   })
  }

  async addData(name: string, data: any) {
    const dataSet = { name: name, value: data };
    await this.indexedDbService.addObject(dataSet);
  }

  async getAllData() {
    const allData = await this.indexedDbService.getAllObjects();
    console.log(allData);
  }

  async deleteData(id: number) {
    await this.indexedDbService.deleteObject(id);
  }

}
