import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './weather.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{
  path: '**',
  component: WeatherComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
