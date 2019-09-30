import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../../models/user';
//import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  bus:any;
  value:any;
  index:any;


  constructor(private http: HttpClient) { }



  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/jason');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers });
       
  }
  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/jason');
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers });
  } 

  getbuses(bus){
    return this.http.post('http://localhost:3000/users/bus', bus);
  }

  // getdata():Observable<any>{
  //   const httpOptions = {
  //     headers : new HttpHeaders({
  //     'Content-Type':'application/json',
  //     })
  //   };
  //   return this.http.get('http://localhost:3000/users/dashboard',httpOptions);
  // }
  
  getProfile(): Observable<any>{
    this.loadToken();
    const httpOptions = {
      headers : new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: this.authToken
      })
    };
    return this.http.get('http://localhost:3000/users/profile',httpOptions);
  }

  getSeats(index){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/jason');
    return this.http.post('http://localhost:3000/users/seats',index, { headers: headers });
  }

  // getBus(): Observable<any>{
  //   const httpOptions = {
  //     headers : new HttpHeaders({
  //     'Content-Type':'application/json',
  //     })
  //   };
  //   return this.http.get('http://localhost:3000/users/bus',httpOptions);
  // }
    

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    console.log(token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user= user;
  }



  loggedin(){
    if (localStorage.getItem('id_token')){
      return true;
    }else{
      return false;
    }
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadValue(){
    const values = localStorage.getItem('value');
    this.value=values;
  }

  logout(){
    this.authToken = null;
    this.user= null;
    localStorage.clear();

  }


}
