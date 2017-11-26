import {Routes, RouterModule } from '@angular/router';
import { DriverComponent } from './controller/driver/driver.component';

const SideMenu_Route: Routes = [
    { path: '', redirectTo: '/driver', pathMatch: 'full'},
    { path: 'driver', component: DriverComponent}
];

export const SideMenu_Routing = RouterModule.forRoot(SideMenu_Route);
