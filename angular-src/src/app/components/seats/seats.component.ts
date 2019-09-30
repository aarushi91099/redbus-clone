import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {
 seat:any;
 event; 
 book=[];
  constructor(
    private router:Router, 
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  check($event){
    if($event.target.checked == true){
      this.seat=localStorage.setItem($event.target.value, JSON.stringify($event.target.value));
      this.book.push($event.target.value);
      console.log($event.target.value);
      console.log(this.book);
    }
    else{
      var a=this.book.findIndex(x=>x===$event.target.value);
      this.book.splice(a,1);
      console.log(this.book);
    }
  }

  submit(){
    const seat={
      index:this.book
    }
    localStorage.setItem("seat",JSON.stringify(seat));
    console.log("seats are"+this.book)
    console.log("length of seats are"+this.book.length);
    for(let i=0;i<this.book.length;i++){

      document.getElementById(this.book[i]).setAttribute("disabled","disabled");
     // console.log(this.book.length);
      const set= {
        index: this.book[i]
      }

      this.authService.getSeats(set).subscribe(data=>{
        console.log('success');
      })
    }
    this.router.navigate(['seats']);
  }
booked(){
    this.router.navigate(['dashboard']);
  }

}
