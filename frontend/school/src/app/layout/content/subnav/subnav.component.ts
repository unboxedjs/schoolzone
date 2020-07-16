import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sz-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.scss'],
})
export class SubnavComponent implements OnInit {
  date = new Date();
  constructor() {}

  ngOnInit(): void {}
}
