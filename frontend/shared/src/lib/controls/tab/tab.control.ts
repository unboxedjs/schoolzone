import { Component, OnInit, Input } from '@angular/core';
import { TabInput } from '../controls.interface';

@Component({
  selector: 'sz-tab',
  templateUrl: './tab.control.html',
  styleUrls: ['./tab.control.scss'],
})
export class TabControl implements OnInit {
  tabs: TabInput[];
  firstItem: TabInput;
  @Input('tabs')
  set Tabs([first, ...rest]: TabInput[]) {
    this.tabs = rest;
    this.firstItem = first;
  }

  constructor() {}

  ngOnInit(): void {}
}
