# Angular Admin Template

#### Create Model

1. Create folder ```models``` 
2. then create file <modelname>.model.ts
3. At <modelname>.model.ts, we can write code like
```javascript
export class <modelName> {
   constructor( <Variable Name>: <Data Type> )
}
```
4. Example for model is
```javascript
export class User {
   constructor(  
    id: number,
    firstName : string,
    lastName: string,
    email: string,
   ){}
}
```

## Create service

From Angular Documentation "Services are a great way to share information among classes that don't know each other". Service will consume the api related data and act as provider for angular component. By using service we can inject the api data to components of the angular. we will use `rxjs` and `Observable` for consuming the service. Now I create the ```user.service.ts``` file for consuming the api service:

#### command for create service
```
ng generate service services/User --spec false
```

#### Import ```classes``` and ```packages``` from consuming service from api
```javascript
import {Http, Response, Headers, RequestOptions} from '@angular/http'
import { User } from '../models/user.model'
import 'rxjs'
import { Observable } from 'rxjs/Rx'
import  { ServiceConfig } from './service.config'
```

To Register the service in app module we will add the ```UserService``` to ```app.module.ts``` file:

```javascript
import {UserService} from './services/user.service'
```

Then add the service to provider array for whole application access:

```javascript
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SideMenu_Routing
  ],
  ```providers: [UserService]```,
  bootstrap: [AppComponent]
})
export class AppModule { }
```

To access the http functionality and package we will add the Http modules at constructor of the service
```javascript
 constructor(private http: Http) { }
```
I have create the class for handling the common properties of service file ```service.config.ts``` which includes:
```javascript
export class ServiceConfig {
 static apiUrl: string = "http://localhost:3000/api/";
}
```

Add the Api Url from ```ServiceConfig``` for access the url of api service:
```javascript
private userApiUrl: string = `${ServiceConfig.apiUrl}/users`
```
#### Consume the [GET] service from api

we will use ```http``` package and ```Observable``` to consume the get service from api.Info provide below:
##### Prototype:
```javascript
 <function Name>() : Observable<ModelName> {
     return <Http Package>.get(<Api Url>)
                .map((<Response>) => <Response>.json())
                .catch((<Error>) => Observable.throw(<Error JSON))
 }
```
##### Example:
```javascript
getUsers(): Observable<User[]> {
    return this.http.get(this.userApiUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'))
  }
```

## Create the Component

Components are the most basic building block of an UI in an Angular application. An Angular application is a tree of Angular components. Angular components are a subset of directives. Unlike directives, components always have a template and only one component can be instantiated per an element in a template.

A component must belong to an NgModule in order for it to be usable by another component or application. To specify that a component is a member of an NgModule, you should list it in the declarations field of that NgModule.

#### Command for create component

We will create two type of component ```flat``` component and ```module``` component. flat component are created at ```src``` root directory. module compoenent will create with folder with component name:

1. Command for ```module``` component
##### Prototype
```javascript
 > ng generate component <component Name> -is --spec false
```
##### Example
```javascript
> ng generate component controller/user -is --spec false
```
This will automatically create two file and add the component to ```app.module.ts``` file:

```
create src\app\controller\user\user.component.html
create src\app\controller\user\user.component.ts
update src\app\app.module.ts
```
Component will automatically added to ```app.module.ts``` file:
```javascript
import { UserComponent } from './controller/user/user.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
   ``` UserComponent,```
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SideMenu_Routing
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

#### Consume the User Service and show the List view
```javascript
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  /* add the user array */
  users: Array<User>;
  
  /* Inject the user service to component */
  constructor(private userService: UserService) { }

  ngOnInit() {

  }

}
```
