import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup;
  submitted=false;

  isInvalid=false;//validate user

  email:String="";
  password:String="";

  result:any;

  constructor(private login:LoginService, private formBuilder:FormBuilder,private router: Router){}

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }

  onSubmit(){

    this.submitted = true

    if(this.loginForm.invalid){
      return
    }else{
      let loginData={

        "email":this.email,
        "password":this.password

      };
       console.warn(loginData);
      this.login.Login(loginData).subscribe((res:any)=>{
        this.result=res;

        console.warn(this.result);
        this.router.navigateByUrl("");

      },(error)=>{
        console.warn(error);
        this.isInvalid=true;
      }
      )

    }

  }

}
