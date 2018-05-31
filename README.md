# Angular Admin Template

## Prequsite
1. @angular/cli@1.5.4

## Special notes
1. Uninstall existing the ```@angular/cli``` npm global package by ```npm uninstall -g @angular/cli```
2. Install the ```@angular/cli@1.5.4``` globally by ```npm install -g @angular/cli@1.5.4```
3. This angular admin template needs ```@angular/cli@1.5.4``` version to run 
4. Remove exiting ```node_modules``` folder by ```rm -fr node_modules```
5. Remove the existing ```package-lock.json``` file
6. then install ```npm install```
4. then run ```ng server``` to start project

#### Create Model

1. Create folder ```models``` 
2. then create file <modelname>.model.ts by ```ng g class models/<model name>```
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
  providers: [UserService],
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
                .catch((<Error>) => Observable.throw(<ERROR_JSON))
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
    UserComponent,
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

we can add the service to ```app.module.ts``` file to ```provider``` block, example
```javascript
providers:[<Service Name>]
```

#### Consume the User Service and show the List view ```user.component.ts``` file
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

  users: Array<User>;
  message:string;
  output: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  } 

  getUsers(): void {
     this.userService.getUsers().subscribe((result: any) => {
        this.users = result.data;
        this.message = result.message;
        this.output = result.statusType;
     }, (error: any) => {
       console.log(error);
       this.users = [];
       this.message = error.message;
       this.output = error.statusType;
     });
  }

}
```

`getUsers()` is a function to subscribe the ```UserService``` result to component:

```javascript

```

#### create the user List component (Sub Component)
To create the sub component we will provide the command as like as component creating command:
```javascript
> ng generate component controller/user/user-list --spec false
```
When the command is execute, those file will be created:

```
create src\app\controller\user\user-list\user-list.component.css
create src\app\controller\user\user-list\user-list.component.html
create src\app\controller\user\user-list\user-list.component.ts
update src\app\app.module.ts
```

Add the ```user-list``` component to ```user``` component. we can modify the ```user.component.html``` to:

```html
<div>
  <app-user-list [users] ="users"></app-user-list>
</div>
```
Then Input the user to ```user-list``` component by using ```Input()``` decorator to ```user-list``` component:
```javascript
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users;
  constructor() { }
  ngOnInit() {
  }
}
```

### show the list to ```user-list.component.html``` file:
```html
<table class="table table-responsive table-bordered">
  <thead>
    <th>#</th>
    <th>First Name:</th>
    <th>Last Name:</th>
    <th>Email:</th>
  </thead>
  <tbody>
    <tr *ngFor="let user of users">
      <td>{{user.id}}</td>
      <td>{{user.firstName}}</td>
      <td>{{user.lastName}}</td>
      <td>{{user.email}}</td>
    </tr>
  </tbody>
</table>
```

## create the angular 4 From component to post data
```javascript
> ng g c controller/user/user-add --spec false 
```
This will create ```user-add``` folder and create 3 files and update the ```app.module.ts``` file for add the component to module 
```
create src/app/controller/user/user-add/user-add.component.css (0 bytes)
create src/app/controller/user/user-add/user-add.component.html (27 bytes)
create src/app/controller/user/user-add/user-add.component.ts (276 bytes)
update src/app/app.module.ts (1238 bytes)
```
User add component ts file will look like
```javascript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```
Add the ```selector: app-user-add```  component to ```user.component.html``` file:
```html
<app-user-add></app-user-add>
```
#### Design the Add from using bootstrap
```html
<div class="container">
  <h1>User Add Form</h1>
  <form (ngSubmit)= "onSubmit()" #userForm ="ngForm">
    <div class="form-group">
      <label for="name">First Name</label>
      <input type="text" class="form-control" id="firstName" required
      [(ngModel)] = "model.firstName" name="firstName"
      />
    </div>
    <div class="form-group">
        <label for="name">Last Name</label>
        <input type="text" class="form-control" id="lastName" required 
        [(ngModel)] ="model.lastName" name="lastName"
        />
      </div>
      <div class="form-group">
          <label for="name">Email</label>
          <input type="text" class="form-control" id="firstName" required
          [(ngModel)] = "model.email" name="email"
          />
        </div>
        <button type="submit" class="btn btn-success">Save</button>
  </form>
</div>
```
I will use the ng model ```[(ngModel)]``` for two way binding for template from to post data to server.
We also use the ```EventEmitter``` to emit form post data ```user-list``` component to ```user``` component.




