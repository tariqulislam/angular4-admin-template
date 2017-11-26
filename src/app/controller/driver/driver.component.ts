import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { Driver } from '../../models/driver'

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styles: []
})
export class DriverComponent implements OnInit {
  hideShowListPage: Boolean = true;
  hideShowAddPage: Boolean = false;
  hideShowEditPage: Boolean = false;
  drivers : Array<Driver>;
  total: number;
  message: string;

  constructor(public driverService: DriverService) {}

  ngOnInit() {
    this.getDrivers();
  }

  hideListEditDetailsPage(): void {
    this.hideShowListPage = false;
    this.hideShowEditPage = false;
    this.hideShowAddPage = true;
  }

  getDrivers(): void {
    this.driverService.getDrivers().subscribe((results:any) => {
      debugger
      this.drivers = results.drivers;
      this.total = results.total;
      this.message = "Get Driver List successfully";
    },(error:any) =>{
       this.drivers = [];
       this.total =0;
       this.message = error;
    })
  }
}
