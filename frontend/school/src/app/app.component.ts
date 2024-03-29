import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadConfig } from './setting/+state/config.action';
import { Observable } from 'rxjs';
import { AppStatus } from '@sz/interface';
import { SelectStatus } from './setting/+state/config.selector';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'sz-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  appStatus$: Observable<AppStatus> = this.store.select(SelectStatus);

  constructor(private store: Store) {
    this.appStatus$.pipe(filter(val => !!val)).subscribe(status => {
      console.info(status?.message);
    });
  }

  ngOnInit() {
    this.store.dispatch(LoadConfig());
  }
}
