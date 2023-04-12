import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  url="http://localhost:8080";
  verify(data:any,user:any){
    return this.http.post(this.url+"/verify/"+user,data)
  }

  resend(user:any){
    return this.http.get(this.url+"/resend/"+user)
  }

  forgotPassword(data:any){
    return this.http.post(this.url+"/forgot",data)
  }

  verifyUser(data:any){
    return this.http.post(this.url+"/verify",data)
  }

  resendCode(){
    return this.http.get(this.url+"/resend")
  }

  updatePassword(data:any){
    return this.http.post(this.url+"/update",data)
  }
}
