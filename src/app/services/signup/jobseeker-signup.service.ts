import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class JobseekerSignupService {


  constructor(private http:HttpClient) { }
  ngOnInit():void{

  }


  Signup(data:any){
    return this.http.post("http://localhost:8080/jobseeker_signup",data,{ responseType: 'text'})
  }

  GetProfileData(data:any){
    return this.http.post("http://localhost:8080/jobseeker",data);
  }

  UpdateProfileData(data:any,id:any){
    return this.http.put("http://localhost:8080/jobseeker/"+id,data);
  }
}
