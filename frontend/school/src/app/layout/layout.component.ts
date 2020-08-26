import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from '../_services/general.service';

@Component({
  selector: 'sz-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @ViewChild('drawer') drawer;
  sliderToggle$ = this.general.slider$;

  constructor(private general: GeneralService) {}

  ngOnInit(): void {
    this.sliderToggle$.subscribe(value => {
      if (value) {
        this.drawer.toggle();
      }
    });
  }
}
