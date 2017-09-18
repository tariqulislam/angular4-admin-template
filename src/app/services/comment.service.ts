import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Comment } from '../models/comment'
import 'rxjs'
import { Observable } from 'rxjs/Rx'


@Injectable()
export class CommentService {
  
  constructor(private http:Http) {}
  
  private commentsUrl = 'http://localhost:3000/api/comments'

  getComments() : Observable<Comment[]> {
    return this.http.get(this.commentsUrl)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'))
  }

  addComment(body: Object) : Observable<Comment[]> {
    let bodyString = JSON.stringify(body)
    let headers = new Headers({'Content-Type': 'application/json'})
    let options = new RequestOptions({headers: headers})

    return this.http.post(this.commentsUrl, body,options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'))
  }

  updateComment(body:Object): Observable<Comment[]> {
    let bodyString = JSON.stringify(body)
    let headers = new Headers({'Content-Type': 'application/json'})
    let options = new RequestOptions({ headers:headers })

    return this.http.put(`${this.commentsUrl}/${body['id']}`, body, options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'))
  }

  removeComment(id:Object): Observable<Comment[]> {
    return this.http.delete(`${this.commentsUrl}/${id}`)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'))

  }
}
