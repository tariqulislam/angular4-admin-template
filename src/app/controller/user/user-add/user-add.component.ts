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
