import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user.model';
import { NgForm, ValidationErrors } from '@angular/forms'
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
 @Input() user: User;
 @Input() message:string;
 @Input() statusType: string;
 @Input() showEditForm: boolean;
 @Output() userUpdateInfo: EventEmitter<any> = new EventEmitter();
 @Output() cancleEditUserInfo: EventEmitter<any> = new EventEmitter();
 isValidFormSubmitted = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = new User(0,'','','')
  }

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

  handleCancleEditForm () : void {
    this.cancleEditUserInfo.emit(true);
  }


}
