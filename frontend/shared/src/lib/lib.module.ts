import { NgModule } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { BrowserModule } from '@angular/platform-browser';
import { ControlsModule } from './controls/controls.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const importAndExport = [
  ControlsModule,
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSidenavModule,
  BrowserAnimationsModule,
];
const declareAndExport = [LogoComponent];
@NgModule({
  imports: [...importAndExport, BrowserModule],
  exports: [...importAndExport, ...declareAndExport],
  declarations: [...declareAndExport],
})
export class LibModule {}
