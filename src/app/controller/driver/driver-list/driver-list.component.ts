import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
  @Input() drivers;
  @Input() total;
  @Input() message;
  @Input() hideShowListPage;
  @Output() driverEdit: EventEmitter<any> = new EventEmitter();

  constructor() {
  
  }

  getEditData(driver): void {
    this.driverEdit.emit(driver)
  }


  ngOnInit() {
  }

}
