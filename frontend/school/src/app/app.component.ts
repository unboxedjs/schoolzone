import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadConfig } from './settings/+state/config.action';
import { Observable } from 'rxjs';
import { AppStatus } from '@sz/interface';
import { SelectStatus } from './settings/+state/config.selector';

@Component({
  selector: 'sz-root',
  template: `
    <sz-layout></sz-layout>
  `,
  styles: [],
})
export class AppComponent {
  appStatus$: Observable<AppStatus> = this.store.select(SelectStatus);

  constructor(private store: Store) {
    this.appStatus$.subscribe(status => {
      console.log(status?.message);
    });
  }

  ngOnInit() {
    this.store.dispatch(LoadConfig());
  }
}
