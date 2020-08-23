import { Component } from '@angular/core';
import { ControlAbstract } from '../common.control';

@Component({
  selector: 'sz-textarea',
  templateUrl: './textarea.control.html',
  styleUrls: ['./textarea.control.scss'],
})
export class TextareaControl extends ControlAbstract {}
