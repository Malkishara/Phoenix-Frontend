import { Component } from '@angular/core';
import { EmployerSignupService } from '../services/signup/employer-signup.service';

@Component({
  selector: 'app-employer-signup',
  templateUrl: './employer-signup.component.html',
  styleUrls: ['./employer-signup.component.css']
})
export class EmployerSignupComponent {
  name:String="";
  address:String="";
  email:String="";
  phone:String="";
  logo:any="";
  password:String="";
  confirmPassword:String="";

  result:any;

  constructor(private signup:EmployerSignupService){}

  employerSignup(){
    if(this.name!="" && this.address!="" && this.email!="" && this.phone!="" && this.logo!="" && this.password!="" && this.confirmPassword!=""){
      let signupData={
        "name":this.name,
        "address":this.address,
        "email":this.email,
        "phone":this.phone,
        "logo":this.logo,
        "password":this.password,
        "confirmPassword":this.confirmPassword

      };

      this.signup.Signup(signupData).subscribe((res:any)=>
      this.result=res)
      if(this.result=="1"){
        alert("Successfully registered");

      this.name="";
      this.address="";
      this.email="";
      this.phone="";
      this.logo="";
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




    }else{
      alert("All fields are required")
    }

  }

  onSubmit(){
    this.employerSignup();
    console.warn("send")

  }
}
