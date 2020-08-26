import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ConfigFeatureKey, configReducer } from './+state/config.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ConfigEffects } from './+state/config.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(ConfigFeatureKey, configReducer),
    EffectsModule.forFeature([ConfigEffects]),
  ],
})
export class SettingModule {}
