import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bus:any;
  seat:any;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.seat=JSON.parse(localStorage.getItem("seat"));
    console.log(this.seat);
    this.bus=JSON.parse(localStorage.getItem("bus"));
    console.log(this.bus);
  }

}
