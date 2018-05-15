import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-driver-add',
  templateUrl: './driver-add.component.html',
  styles: []
})
export class DriverAddComponent implements OnInit {
  @Input() hideShowAddPage;

  constructor() { }

  ngOnInit() {
    
  }

}
