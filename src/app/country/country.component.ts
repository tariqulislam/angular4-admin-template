import { Component, OnInit } from '@angular/core';
import { CountryService } from "./../services/country.service";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styles: []
})
export class CountryComponent implements OnInit {
  lstCountries : any;
  constructor(private _countryService:CountryService) { }

  ngOnInit() {
    this.callCountryService();
  }

  callCountryService() {
    this._countryService.getAll()
        .subscribe(
          lstresult => {
            console.log("this is result of country list");
            console.log(lstresult);
            this.lstCountries = lstresult;
          },
          error => {
            console.log("Errror. The callAll service for country has error");
            console.log(error);
          }
        );

  }

}
