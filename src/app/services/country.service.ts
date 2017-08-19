import { Injectable } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class CountryService {
  countryApiUri : string = "https://jsonplaceholder.typicode.com/comments";
  totReqsMade: number = 0;

  constructor(private _http:Http) { }

  getAll() {
    this.totReqsMade = this.totReqsMade +1;
    return this._http.get(this.countryApiUri)
          .map(response => {
            return response.json();
          })
          .catch(error=> Observable.throw(error.json()));
  }

}
