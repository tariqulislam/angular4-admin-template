# Angular Admin Template

## Prerequisite
1. @angular/cli@1.5.4

## Special notes
1. Uninstall existing  ```@angular/cli``` npm global package by ```npm uninstall -g @angular/cli```
2. Install the ```@angular/cli@1.5.4``` globally by ```npm install -g @angular/cli@1.5.4```
3. This angular admin template needs ```@angular/cli@1.5.4``` version to run 
4. Remove existing ```node_modules``` folder by ```rm -fr node_modules```
5. Remove the existing ```package-lock.json``` file
6. Then install ```npm install```
4. Then run ```ng server``` to start project

#### Create Model

1. Create folder ```models``` 
2. Then create file <modelname>.model.ts by ```ng g class models/<model name>```
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
I have created the class for handling the common properties of service file ```service.config.ts``` which includes:
```javascript
export class ServiceConfig {
 static apiUrl: string = "http://localhost:3000/api/";
}
```

Add the Api Url from ```ServiceConfig``` for accessing the url of api service:
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

Components are the most basic building block of an UI in an Angular application. An Angular application is a tree of Angular components. Angular components are a subset of directives. Unlike directives, components always have a template and only one component can be instantiated per element in a template.

A component must belong to an NgModule in order to be usable by another component or application. To specify that a component is a member of an NgModule, you should list it in the declarations field of that NgModule.

#### Command to create component

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
Component will be automatically added to ```app.module.ts``` file:
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
To create the sub component we will provide the command similar to component creating command:
```javascript
> ng generate component controller/user/user-list --spec false
```
On executing the command, those file will be created:

```
create src\app\controller\user\user-list\user-list.component.css
create src\app\controller\user\user-list\user-list.component.html
create src\app\controller\user\user-list\user-list.component.ts
update src\app\app.module.ts
```

Add the ```user-list``` component to ```user``` component. Now we modify the ```user.component.html``` to:

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
This will create ```user-add``` folder and create 3 files and update the ```app.module.ts``` file for adding the component to module 
```
create src/app/controller/user/user-add/user-add.component.css (0 bytes)
create src/app/controller/user/user-add/user-add.component.html (27 bytes)
create src/app/controller/user/user-add/user-add.component.ts (276 bytes)
update src/app/app.module.ts (1238 bytes)
```
User add component ts file will look like
```javascript
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from '../../../models/user.model';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  @Output() userCreate:  EventEmitter<any> = new EventEmitter();
  @Input() message: string;
  @Input() statusType: string;
  constructor() { }

  model = new User(0,'Tariqul','islam','');

  ngOnInit() {
  }

  onSubmit() {
     this.userCreate.emit(this.model);
  }

}
```
Add the ```selector: app-user-add```  component to ```user.component.html``` file:
```html
<app-user-add></app-user-add>
```
#### Design th page Add by using bootstrap
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
I will use the ng model ```[(ngModel)]``` for two way binding to post data to server.
We also use the ```EventEmitter``` to emit form post data from ```user-list``` component to ```user``` component.
```javascript
@Output() userCreate:  EventEmitter<any> = new EventEmitter();
@Input() message: string;
@Input() statusType: string;
```
Emit the function to ```user``` component by ```onSubmit``` method:
```javascript
  onSubmit() {
     this.userCreate.emit(this.model);
  }
```
In ```user``` component we will ```subscribe``` the create api service ```user.component.ts```:
```javascript
  onSaveUser(user:User): void {
    this.userService.addUser(user).subscribe((result:any) => {
        this.message = result.message;
        this.statusType = result.statusType;
        this.getUsers();
    }, (error: any) => {
        this.message = error.message;
        this.statusType = error.statusType;
    });
  }
```
We can consume the user save post service at ```user.service.ts``` file:
```javascript
addUser(body:User): Observable<Object> {
     const bodyString = JSON.stringify(body);
     const headers = new Headers({'Content-Type': 'application/json'});
     const options = new RequestOptions({headers: headers});

     return this.http.post(this.userApiUrl,body,options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'))
}
```
#Template from Validation
```html
<div class="container">
  <h1>User Add Form</h1>
  <form (ngSubmit)= "onSubmit(userForm)" #userForm ="ngForm">

    <div class="form-group">
      <label for="name">First Name</label>
      <input type="text" #firstName="ngModel" class="form-control" id="firstName" required
      [(ngModel)] = "user.firstName" name="firstName" minlength="5"
      />
      <span  *ngIf="firstName.errors?.required && userForm.submitted && !isValidFormSubmitted" [ngClass] = "'error'">
        First Name is required
      </span>
      <span *ngIf="firstName.errors?.minlength && userForm.submitted && !isValidFormSubmitted" [ngClass]="'error'">
          Name must be at least 5 characters long.
      </span>
    </div>
    <div class="form-group">
        <label for="name">Last Name</label>
        <input type="text" #lastName="ngModel" class="form-control" id="lastName" required 
        [(ngModel)] ="user.lastName" name="lastName"
        />
        <span *ngIf="lastName.errors?.required && userForm.submitted && !isValidFormSubmitted" [ngClass]= "'error'">
          Last Name is Required
        </span>
      </div>
      <div class="form-group">
          <label for="name">Email</label>
          <input type="text" #email="ngModel" class="form-control" id="firstName" required
          [(ngModel)] = "user.email" name="email"
          />
          <span *ngIf="email.errors?.required && userForm.submitted && !isValidFormSubmitted" [ngClass]= "'error'">
              Email is Required
            </span>
        </div>
        <button type="submit" class="btn btn-success">Save</button>
  </form>
</div>
```

## Edit Data by angular 4
  
To create Edit From, i will run the command below

```javascript
> ng generate component controller/user/user-edit --spec false
```

```
output:

  create src/app/controller/user/user-edit/user-edit.component.html (28 bytes)
  create src/app/controller/user/user-edit/user-edit.component.ts (280 bytes)
  create src/app/controller/user/user-edit/user-edit.component.css (0 bytes)
  update src/app/app.module.ts (1274 bytes)
```
it will create ```user-edit.component.html```, ```user-edit.component.ts``` and ```user-edit.component.css``` in ```user-edit``` directory:

Then i have to design the ```user-edit``` form, which will follow one way binding for angular ```[ngModel]```:
```html

<div *ngIf="showEditForm" class="box">
  <div class="box-header with-border">
      User Edit Form
  </div>
  <div class="box-body">
    <form (ngSubmit)= "onSubmit(userEditForm)" #userEditForm ="ngForm">
    
      <div class="form-group">
        <label for="name">First Name</label>
        <input type="hidden" #id="ngModel" id="id" required [(ngModel)] ="user.id" name="id" />
        <input type="text" #firstName="ngModel" class="form-control" id="firstName" required
        [ngModel] = "user.firstName" name="firstName" minlength="5"
        />
        <span  *ngIf="firstName.errors?.required && userEditForm.submitted && !isValidFormSubmitted" [ngClass] = "'error'">
          First Name is required
        </span>
        <span *ngIf="firstName.errors?.minlength && userEditForm.submitted && !isValidFormSubmitted" [ngClass]="'error'">
            Name must be at least 5 characters long.
        </span>
      </div>
      <div class="form-group">
          <label for="name">Last Name</label>
          <input type="text" #lastName="ngModel" class="form-control" id="lastName" required 
          [ngModel] ="user.lastName" name="lastName"
          />
          <span *ngIf="lastName.errors?.required && userEditForm.submitted && !isValidFormSubmitted" [ngClass]= "'error'">
            Last Name is Required
          </span>
        </div>
        <div class="form-group">
            <label for="name">Email</label>
            <input type="text" #email="ngModel" class="form-control" id="firstName" required
            [ngModel] = "user.email" name="email"
            />
            <span *ngIf="email.errors?.required && userEditForm.submitted && !isValidFormSubmitted" [ngClass]= "'error'">
                Email is Required
              </span>
          </div>
          <button type="submit" class="btn btn-success">Update</button>
          <button (click)="handleCancleEditForm()" class="btn btn-primary">Cancel</button>
    </form>
  </div>
  </div>
```
we will use ```showEditForm``` and ```showAddForm``` to hide and show the user add and edit form at user ```user``` component global variable.

```javascript
  showAddForm: boolean = true;
  showEditForm: boolean = false;
```
To open the user edit from and hide the user add form, we can use this code statement and pass the selected user values to
```edit-user``` component

```this.user = user;``` pass the user information to ```user-edit``` component:

```javascript
onEditUser(user:User): void {
    this.showEditForm= true;
    this.showAddForm = false;
    this.user = user;
}
```
Update the code in ```user.component.html``` file ```edit-user``` component:
```html
<app-user-edit [showEditForm]="showEditForm" (userUpdateInfo)="onUpdateUser($event)" [user]="user"></app-user-edit>
```

Then write the method wich will update the user and update the parent ```user``` component also
```javascript
onSubmit(form: NgForm) {
  this.isValidFormSubmitted = false;
  if(form.invalid) {
    return;
  }
  this.isValidFormSubmitted = true;
  this.user = form.value;
  this.userService.updateUser(this.user).subscribe((result:any) => {
    this.userUpdateInfo.emit(result)
  }, (error: any) => {
    this.userUpdateInfo.emit(error);
  });
      
}
```
We will use the ```EventEmitter``` of ```@angular/core``` for emit the user is update and update the list of the user to ```parent``` component ```user```. we will add the those ```EventEmitter``` as global variable at ```user-edit.component.ts``` file:
```javascript
@Output() userUpdateInfo: EventEmitter<any> = new EventEmitter();
```
To pass the ```EventEmitter``` to parent component we will update ```user.component.html``` file:
```html
 <app-user-edit  [showEditForm]="showEditForm" (userUpdateInfo)="onUpdateUser($event)" [user]="user"></app-user-edit>
```
we will add ```(userUpdateInfo)="onUpdateUser($event)"``` to ```<app-user-edit>``` component:

To update the ```user``` component, we will add ```onUpdateUser``` function which will be emit by ```userUpdateInfo``` method
from ```user-edit``` component.
```javascript
onUpdateUser(result:any): void {
    if(result.statusType == "success") {
      this.message = result.message;
      this.statusType = result.statusType;
      this.getUsers();
    } else if (result.statusType == "error") {
      this.message = result.message;
      this.statusType = result.statusType;
      this.getUsers();
    } 
  }
```
To cancle the edit form and update the ```user``` component we will update the ```user-edit``` component add the 
```javascript
@Output() cancleEditUserInfo: EventEmitter<any> = new EventEmitter();
```
EventEmitter to ```user-edit``` component global variable, add the functions
```javascript
handleCancleEditForm () : void {
    this.cancleEditUserInfo.emit(true);
  }

```
for Emit the cancle event to ```user``` component.
Then update ```user.component.html``` for emit the cancle event to ```user``` component using ```(cancleEditUserInfo) = "onCancelUserInfo($event)"```:

```html
 <app-user-edit (cancleEditUserInfo) = "onCancelUserInfo($event)" [showEditForm]="showEditForm" (userUpdateInfo)="onUpdateUser($event)" [user]="user"></app-user-edit>
```


