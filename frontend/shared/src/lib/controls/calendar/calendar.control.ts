import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'sz-calendar',
  templateUrl: './calendar.control.html',
  styleUrls: ['./calendar.control.scss'],
})
export class CalendarControl implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
  };
  constructor() {}

  ngOnInit(): void {}
}
