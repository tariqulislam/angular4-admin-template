import { Routes, RouterModule } from '@angular/router';
import { CurrencyComponent } from "./currency/currency.component";
import { WeatherComponent } from "./weather/weather.component";
import { MovieComponent } from "./movie/movie.component";
import { CountryComponent } from "./country/country.component";

const MAINMENU_ROUTES: Routes = [

    { path: '', redirectTo: '/weather', pathMatch: 'full' },
    { path: 'weather', component: WeatherComponent },
    { path: 'movie', component: MovieComponent },
    { path: 'currency', component: CurrencyComponent },
    { path: 'country', component: CountryComponent }
];

export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);
