import {Routes, RouterModule } from '@angular/router';
import { UserComponent } from './controller/user/user.component';

const SideMenu_Route: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full'},
    { path: 'users', component: UserComponent}
];

export const SideMenu_Routing = RouterModule.forRoot(SideMenu_Route);
