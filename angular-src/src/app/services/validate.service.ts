import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined){
      return false;
    }
    else{
      return true;
    }
  }

  validateEmail(email){
    const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    console.log(email);
    //var address = document.getElementById[email].value;
    if (reg.test(email) == false) 
    {
      console.log('hy');
      return false;
    }
    else{
      return true;
    }
  }
}
