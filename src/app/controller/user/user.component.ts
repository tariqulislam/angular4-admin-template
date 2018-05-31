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

  onSaveUser(user:User): void {
    debugger
    console.log("user", user);
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
