import { Component } from '@angular/core';
import { JobseekerSignupService } from '../services/signup/jobseeker-signup.service';

@Component({
  selector: 'app-jobseeker-signup',
  templateUrl: './jobseeker-signup.component.html',
  styleUrls: ['./jobseeker-signup.component.css']
})
export class JobseekerSignupComponent {

  first_name:String="";
  last_name:String="";
  email:String="";
  phone:String="";
  cv:any="";
  password:String="";
  confirmPassword:String="";


  result:any;
  constructor(private signup:JobseekerSignupService){}

  jobSeekerSignup(){
    if(this.first_name!="" && this.last_name!="" && this.email!="" && this.phone!="" && this.cv!="" && this.password!="" && this.confirmPassword!=""){
      let signupData={
        "firstName":this.first_name,
        "lastName":this.last_name,
        "email":this.email,
        "phoneNumber":this.phone,
        "cv":this.cv,
        "password":this.password,
        "confirmPassword":this.confirmPassword

      };

      this.signup.Signup(signupData).subscribe((res:any)=>{
        this.result=res;

        if(this.result=="1"){
          alert("Successfully registered");

          this.first_name="";
          this.last_name="";
          this.email="";
          this.phone="";
          this.cv="";
          this.password="";
          this.confirmPassword="";

          this.result=="";
        }else if(this.result=="2"){
          alert("Already registered email");
          this.result=="";
        }else if(this.result=="3"){
          alert("Confirmed password not matching with password");
          this.result=="";
        }
      }
      )




    }

    else{
      alert("All fields are required")
    }

  }

  onSubmit(){
    this.jobSeekerSignup();
    console.warn("send")

  }

}
