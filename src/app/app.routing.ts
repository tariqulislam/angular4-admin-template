import {Routes, RouterModule } from '@angular/router';
import { CurrencyComponent } from "./currency/currency.component";
import { WeatherComponent } from './weather/weather.component';
import { DriverComponent } from './controller/driver/driver.component';

const SideMenu_Route: Routes = [
    { path: '', redirectTo: '/weather', pathMatch: 'full'},
    { path: 'weather', component: WeatherComponent },
    { path: 'currency', component: CurrencyComponent },
    { path: 'driver', component: DriverComponent}
];

export const SideMenu_Routing = RouterModule.forRoot(SideMenu_Route);
