import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions}  from '@angular/http';
import { Driver } from '../models/driver'
import 'rxjs'
import { Observable } from 'rxjs/Rx'

@Injectable()
export class DriverService {



  constructor(private http:Http) { }

  private driverUrl = 'http://localhost:3000/drivers'

  getDrivers(): Observable<any> {
    return this.http.get(this.driverUrl)
                .map((res: Response) =>{
                  debugger
                   console.log(res)
                })
                .catch((error:any) => Observable.throw(error.json().error || 'Server Error'))
  }

}
