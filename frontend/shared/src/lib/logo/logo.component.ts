import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sz-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() poweredBy = true;

  constructor() {}

  ngOnInit(): void {}
}
