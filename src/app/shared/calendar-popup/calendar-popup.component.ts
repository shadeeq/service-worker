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
    '12:00 AM', '12:30 AM', '01:00 AM', '01:30 AM', '02:00 AM', '02:30 AM',
    '03:00 AM', '03:30 AM', '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM',
    '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM',
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM',
    '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM',
  ];
  endTimeOptions: string[] = []

  eventForm: FormGroup = this.formBuilder.group({
    id: [new Date().getTime().toString()],
    title: [null, [Validators.required]],
    date: [null],
    start: [null],
    end: [null],
    eventStartTime: [null],
    eventEndTime: [null],
    status: [null],
    allDay: [false]
  })
  
  eventStatus = EventStatus
  eventStatusOptions = Object.keys(EventStatus).map((key:any) =>EventStatus[key]).filter(value => typeof value === 'string') as string[];

  constructor(
    public dialogRef: MatDialogRef<CalendarPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public calendarEvent: any,
    private readonly formBuilder: FormBuilder,
  ) {

  }

  ngOnInit(){
    this.eventForm.patchValue(this.calendarEvent)
  }

  onCancel(){
    this.dialogRef.close()
  }

  onOk(){
    const values = this.eventForm.getRawValue()
    this.dialogRef.close(values)
  }

  getStatusValue(key: string): number {
    return EventStatus[key as keyof typeof EventStatus];
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
      const [hour, minutes] = hourMinutes.split(':').map(Number); // Parse hour and minutes as numbers
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
      console.log(closestStartTimeIndex, startTime)
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

}
