import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { selectRouteData } from '../../../+state';
import { Store } from '@ngrx/store';
import { Data } from '@angular/router';

@Component({
  selector: 'sz-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  data$: Observable<Data> = this.store.select(selectRouteData);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
