import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private flashMessage: NgFlashMessageService,
    private router:Router 
  ) { }

  ngOnInit() { 
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.showFlashMessage({messages:["You are now logged out"],dismissible: true, timeout: 3000, type: 'success'});
    this.router.navigate(['/login']);
    return false;
  }

}
