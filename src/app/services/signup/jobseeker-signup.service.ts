import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobseekerSignupService {

  constructor(private http:HttpClient) { }

  Signup(data:any){
    return this.http.post("http://localhost:8080/jobseeker_signup",data,{ responseType: 'text'})
  }
}
