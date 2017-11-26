import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './themes/header/header.component';
import { FooterComponent } from './themes/footer/footer.component';
import { MenuComponent } from './themes/menu/menu.component';
import { WeatherComponent } from './weather/weather.component';
import { CurrencyComponent } from './currency/currency.component';
import { SideMenu_Routing }  from './app.routing';
import { DriverComponent } from './controller/driver/driver.component';
import { DriverListComponent } from './controller/driver/driver-list/driver-list.component';
import { DriverService } from './services/driver.service';
import { DriverDetailsComponent } from './controller/driver/driver-details/driver-details.component';
import { DriverEditComponent } from './controller/driver/driver-edit/driver-edit.component';
import { DriverAddComponent } from './controller/driver/driver-add/driver-add.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    WeatherComponent,
    CurrencyComponent,
    DriverComponent,
    DriverListComponent,
    DriverDetailsComponent,
    DriverEditComponent,
    DriverAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SideMenu_Routing
  
  ],
  providers: [DriverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
