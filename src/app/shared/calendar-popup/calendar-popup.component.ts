import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EventStatus } from '../full-calendar/full-calendar.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EventInput } from "@fullcalendar/core";

@Component({
  selector: 'app-calendar-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './calendar-popup.component.html',
  styleUrl: './calendar-popup.component.scss'
})
export class CalendarPopupComponent implements OnInit{
  @ViewChild('startTimeSelect') startTimeSelect!: MatSelect;

  showTimeSelect: boolean = false
  startTimeOptions: string[] = [
    '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
    '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
    '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
  ];
  endTimeOptions: string[] = []
  statusDisabled: boolean = false
  eventForm: FormGroup = this.formBuilder.group({
    id: [new Date().getTime().toString()],
    title: [null, [Validators.required]],
    date: [null],
    start: [null],
    end: [null],
    eventStartTime: [null],
    eventEndTime: [null],
    allDay: [false],
    className: [''],
    display: ['list-item'],
    backgroundColor: [null]
  })

  eventStatusOptions = Object.keys(EventStatus).map(
    (key:any) => EventStatus[key]).filter(
      value => typeof value === 'string') as string[];

  constructor(
    public dialogRef: MatDialogRef<CalendarPopupComponent, EventInput>,
    @Inject(MAT_DIALOG_DATA) public calendarEvent: EventInput,
    private readonly formBuilder: FormBuilder,
  ) {}

  ngOnInit(){
    this.eventForm.patchValue(this.calendarEvent);
  }

  onCancel(){
    this.dialogRef.close()
  }

  onOk(){
    const values = this.eventForm.getRawValue()
    this.dialogRef.close(values)
  }

  toggleTimeSelect(showTime: boolean){
    this.showTimeSelect = showTime
    this.endTimeOptions = [...this.startTimeOptions]

    if (showTime){
      this.openStartTimeSelect()
    } else {
      this.clearTimeSelectFields()
    }
  }

  private clearTimeSelectFields(){
    this.eventForm.patchValue({
      eventEndTime: null,
      eventStartTime: null
    });
  }

  private openStartTimeSelect(){

    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentTimestamp = currentHour * 60 + currentMinutes;
    let closestStartTimeIndex = 0;
    let closestDifference = Number.MAX_VALUE;

    this.startTimeOptions.forEach((time, index) => {
      const [hourMinutes, ampm] = time.split(' ');
      const [hour, minutes] = hourMinutes.split(':').map(Number);
      const adjustedHour = ampm === 'PM' && hour !== 12 ? hour + 12 : hour;
      const timestamp = adjustedHour * 60 + minutes;
      const difference = Math.abs(timestamp - currentTimestamp);
      if (difference < closestDifference) {
        closestDifference = difference;
        closestStartTimeIndex = index;
      }
    });
    const startTime = this.eventForm.get('eventStartTime')
    setTimeout(() => {
      this.startTimeSelect.open()
      this.startTimeSelect.value = this.startTimeOptions[closestStartTimeIndex];
      startTime?.patchValue(this.startTimeOptions[closestStartTimeIndex])
      this.updateEndTimeOptions(startTime?.value)
    })
  }

  updateEndTimeOptions(startTime: string){
    const startIndex = this.startTimeOptions.indexOf(startTime);
    if (startIndex !== -1) {
      this.eventForm.patchValue({
        eventEndTime: null
      });
      this.endTimeOptions = this.startTimeOptions.slice(startIndex + 1);
    }
  }

  addClassName(event:boolean){
    if (event) {
      this.statusDisabled = true
      this.eventForm.get('className')?.patchValue('full-day')
      this.eventForm.get('display')?.patchValue('background')
      this.eventForm.get('backgroundColor')?.patchValue('yellow')
    } else {
      this.statusDisabled = false
    }
  }
}
