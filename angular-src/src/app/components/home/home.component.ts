import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  from:String;
  to:String;
  constructor(
    private authService: AuthService,
    private flashMessage: NgFlashMessageService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  search(){
    const bus = {
      from:this.from,
      to:this.to
    }
  
  this.authService.getbuses(bus).subscribe(data => {
    console.log(data);
    if(data.success){
      localStorage.setItem("bus",JSON.stringify(data));
      console.log('True');
      //this.flashMessage.showFlashMessage({messages:["Bus Details"],dismissible: true, timeout: 3000, type: 'success'});
      this.router.navigate(['bus']);
    }
    else{
      console.log('False');
      this.flashMessage.showFlashMessage({messages:["Bus Not Found"],dismissible: true, timeout: 3000, type: 'danger'});
      this.router.navigate(['']);
    }
    
  

  });
};
}
