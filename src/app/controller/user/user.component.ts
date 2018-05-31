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
  statusType: string;

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
