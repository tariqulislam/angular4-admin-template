import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user.model';
import { NgForm, ValidationErrors } from '@angular/forms'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
 @Input() user: User;
 @Input() message:string;
 @Input() statusType: string;
 @Output() userUpdateInfo: EventEmitter<any> = new EventEmitter();
 isValidFormSubmitted = false;
  constructor() { }

  ngOnInit() {
    this.user = new User(0,'','','')
  }

  onSubmit(form: NgForm) {
     this.isValidFormSubmitted = false;
      if(form.invalid) {
        return;
      }

      debugger

      this.isValidFormSubmitted = true;
      this.user = form.value;
      this.userUpdateInfo.emit(this.user)
      if(this.statusType =="success") {
        this.user = new User(0,'','','');
        form.resetForm();
      }

    }
}
