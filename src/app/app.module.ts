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





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    WeatherComponent,
    CurrencyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SideMenu_Routing
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
