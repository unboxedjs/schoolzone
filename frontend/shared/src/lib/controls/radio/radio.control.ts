import { Component, Input } from '@angular/core';
import { ControlAbstract } from '../common.control';

@Component({
  selector: 'sz-radio',
  templateUrl: './radio.control.html',
  styleUrls: ['./radio.control.scss'],
})
export class RadioControl extends ControlAbstract {
  @Input() options: string[];
}
