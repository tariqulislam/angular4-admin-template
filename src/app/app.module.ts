import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu.component';
import { WeatherComponent } from './weather/weather.component';
import { CurrencyComponent } from './currency/currency.component';
import { MovieComponent } from './movie/movie.component';
import { CONST_ROUTING } from './app.routing';
import { CountryComponent } from './country/country.component';
import { CountryService } from './services/country.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WeatherComponent,
    CurrencyComponent,
    MovieComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CONST_ROUTING
  ],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
