import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name:String;
  email:String;
  username:String;

  constructor(
    private authService: AuthService,
    private router:Router 
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile =>{
      
      this.name = profile.user.name;
      this.username = profile.user.username;
      this.email = profile.user.email;
      console.log(profile);
    },
    err =>{
      console.log(err);
      return false; 
    });
}
}

