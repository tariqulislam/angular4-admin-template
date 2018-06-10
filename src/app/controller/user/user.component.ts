import { Component, OnInit, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {
  showAddForm: boolean = true;
  showEditForm: boolean = false;
  users: Array<User>;
  message:string;
  statusType: string;
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  } 

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

  onEditUser(user:User): void {
    this.showEditForm= true;
    this.showAddForm = false;
    this.user = user;

  }

  onUpdateUser(result:any): void {
    if(result.statusType == "success") {
      this.message = result.message;
      this.statusType = result.statusType;
      this.getUsers();
      this.showEditForm = false;
      this.showAddForm = true;
    } else if (result.statusType == "error") {
      this.message = result.message;
      this.statusType = result.statusType;
      this.getUsers();
      this.showEditForm = true;
      this.showAddForm = false;
    } 
  }

  getUsers(): void {
     this.userService.getUsers().subscribe((result: any) => {
        this.users = result.data;
        this.message = result.message;
        this.statusType = result.statusType;
     }, (error: any) => {
       console.log(error);
       this.users = [];
       this.message = error.message;
       this.statusType = error.statusType;
     });
  }

}
