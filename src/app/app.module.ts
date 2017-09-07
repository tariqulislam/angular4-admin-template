import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { WeatherComponent } from './weather/weather.component';
import { CurrencyComponent } from './currency/currency.component';
import { MovieComponent } from './movie/movie.component';
import { CONST_ROUTING } from './app.routing';
import { CountryComponent } from './country/country.component';
import { CountryService } from './services/country.service';
import { HttpModule } from '@angular/http';
import { LeftnavComponent } from './leftnav.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherComponent,
    CurrencyComponent,
    MovieComponent,
    CountryComponent,
    LeftnavComponent
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
