import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {
  from:String;
  to:String;
  seats:Number;;
  timimg:String;
  bus:any;

  constructor(
    private authService: AuthService,
    private flashMessage: NgFlashMessageService,
    private router:Router 
  ) { }

  ngOnInit() {
    this.bus=JSON.parse(localStorage.getItem("bus"));
    console.log(this.bus);
    //console.log(this.bus)
    // this.authService.getbuses(this.bus).subscribe(data => {
    //   console.log(data);
    //   if(data){
    //     console.log('True');
    //     this.flashMessage.showFlashMessage({messages:["Bus Details"],dismissible: true, timeout: 3000, type: 'success'});
    //     this.router.navigate(['bus']);
    //   }
    //   else{
    //     console.log('False');
    //     this.flashMessage.showFlashMessage({messages:["Bus Not Found"],dismissible: true, timeout: 3000, type: 'danger'});
    //     this.router.navigate(['']);
    //   }
      
    
  
    // });
  }

  book(){
    this.router.navigate(['seats']);
  }
}