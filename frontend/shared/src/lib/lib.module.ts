import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { LogoComponent } from './logo/logo.component';

const importAndExport = [MaterialModule];
const declareAndExport = [LogoComponent];
@NgModule({
  imports: [...importAndExport],
  exports: [...importAndExport, ...declareAndExport],
  declarations: [...declareAndExport],
})
export class LibModule {}
