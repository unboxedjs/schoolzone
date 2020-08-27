import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sz-viewport',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./viewport.component.scss'],
})
export class ViewportComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
