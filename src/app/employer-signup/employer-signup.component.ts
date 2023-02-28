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
  selectedFile!: File;

  result:any;

  constructor(private signup:EmployerSignupService){}

  //Gets called when the user selects an image
  // public onFileChanged(event:any): void {
  //   //Select File
  //   this.selectedFile = event.target.files[0];
  // }

  employerSignup(){

    // console.log(this.selectedFile);

    // //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    // const uploadImageData = new FormData();
    // uploadImageData.append('imageFile', this.selectedFile,this.selectedFile?.name);

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

      this.signup.Signup(signupData).subscribe((res:any)=>{
        this.result=res;
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
      }
      )





    }else{
      alert("All fields are required")
    }

  }

  onSubmit(){
    this.employerSignup();
    console.warn("send")

  }
}
