import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users;
  @Output() userEditInfo: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  getEditData(user: User): void {
    this.userEditInfo.emit(user);
  }

}
