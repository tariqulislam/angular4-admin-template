import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
  @Input() drivers;
  @Input() total;
  @Input() message;

  constructor() {
  
   }

  ngOnInit() {
    debugger
    const driv = this.drivers
  }

}
