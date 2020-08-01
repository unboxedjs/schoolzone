import { Component } from '@angular/core';
import { GeneralService } from './_services/general.service';
import { AppStatus } from '@sz/interface';

@Component({
  selector: 'sz-root',
  template: `
    <sz-layout></sz-layout>
  `,
  styles: [],
})
export class AppComponent {
  constructor(private general: GeneralService) {
    this.general.$appStatus.subscribe((status: AppStatus) => {
      console.info(status.message);
    });
  }
}
