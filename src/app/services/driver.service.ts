import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions}  from '@angular/http';
import { Driver } from '../models/driver'
import 'rxjs'
import { Observable } from 'rxjs/Rx'

@Injectable()
export class DriverService {



  constructor(private http:Http) { }

  private driverUrl = 'http://165.227.162.110/drivers/list?offset=0&limit=20'

  getDrivers(): Observable<any> {
    return this.http.get(this.driverUrl)
                .map((res: Response) => res.json())
                .catch((error:any) => Observable.throw(error.json().error || 'Server Error'))
  }

}
