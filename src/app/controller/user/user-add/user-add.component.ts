import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from '../../../models/user.model';
import { NgForm, ValidationErrors } from '@angular/forms'


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  @Output() userCreate:  EventEmitter<any> = new EventEmitter();
  @Input() message: string;
  @Input() statusType: string;

  isValidFormSubmitted = null;
  user = new User(0,'','','');

 

  constructor() { }


  ngOnInit() {
    
  }

  onSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
      if(form.invalid) {
        return;
      }

     this.isValidFormSubmitted = true;
     this.user = form.value;
     this.userCreate.emit(this.user);
     this.user = new User(0,'','','');
     form.resetForm()
  }

}
