import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './themes/header/header.component';
import { FooterComponent } from './themes/footer/footer.component';
import { MenuComponent } from './themes/menu/menu.component';
import { SideMenu_Routing }  from './app.routing';
import {UserService} from './services/user.service';
import { UserComponent } from './controller/user/user.component';
import { UserListComponent } from './controller/user/user-list/user-list.component';
import { DriveAddComponent } from './controller/user/drive-add/drive-add.component';
import { UserAddComponent } from './controller/user/user-add/user-add.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    UserComponent,
    UserListComponent,
    DriveAddComponent,
    UserAddComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SideMenu_Routing
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
