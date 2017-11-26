import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styles: []
})
export class DriverEditComponent implements OnInit {
  @Input() hideShowEditPage;

  constructor() { }

  ngOnInit() {
  }

}
