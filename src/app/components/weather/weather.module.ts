import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [WeatherComponent],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    SharedModule
  ],
  providers: [
    WeatherService
  ]
})
export class WeatherModule { }
