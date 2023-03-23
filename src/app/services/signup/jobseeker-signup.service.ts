import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class JobseekerSignupService {

  url='http://localhost:8080';

  constructor(private http:HttpClient) { }
  ngOnInit():void{

  }


  Signup(data:any){
    return this.http.post(this.url+"/jobseeker_signup",data,{ responseType: 'text'})
  }



  UpdateProfileData(data:any,id:any){
    return this.http.put(this.url+"/jobseeker/"+id,data);
  }

  GetJobseekerDataById(id:any){
    return this.http.get(this.url+"/jobseeker/"+id)

  }
}
