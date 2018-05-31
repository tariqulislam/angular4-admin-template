import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http'
import { User } from '../models/user.model'
import 'rxjs'
import { Observable } from 'rxjs/Rx'
import  { ServiceConfig } from './service.config'

@Injectable()
export class UserService {

  constructor(private http: Http) {}
  
  private userApiUrl: string = `${ServiceConfig.apiUrl}users`;
  

  getUsers(): Observable<User[]> {
    return this.http.get(this.userApiUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'))
  }

  addUser(body:User): Observable<Object> {
     const bodyString = JSON.stringify(body);
     const headers = new Headers({'Content-Type': 'application/json'});
     const options = new RequestOptions({headers: headers});

     return this.http.post(this.userApiUrl,body,options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'))

  }


}
