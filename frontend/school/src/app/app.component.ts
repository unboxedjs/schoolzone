import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadConfig } from './settings/+state/config.action';
import { Observable } from 'rxjs';
import { AppStatus } from '@sz/interface';
import { SelectStatus } from './settings/+state/config.selector';
import { GeneralService } from './_services/general.service';

@Component({
  selector: 'sz-root',
  template: `
    <sz-layout [ngClass]="{ 'dark-theme': isDarkTheme$ | async }"></sz-layout>
  `,
  styles: [],
})
export class AppComponent {
  appStatus$: Observable<AppStatus> = this.store.select(SelectStatus);
  isDarkTheme$ = this.general.darkTheme$;

  constructor(private store: Store, private general: GeneralService) {
    this.appStatus$.subscribe(status => {
      console.info(status?.message);
    });
  }

  ngOnInit() {
    this.store.dispatch(LoadConfig());
  }
}
