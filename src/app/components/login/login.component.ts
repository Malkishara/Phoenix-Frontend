import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { LoginService } from '../../services/login/login.service';
// import { User } from '../user.module';

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

  isLoggedin:Boolean=false;
  loggedinUserType:String="";
  loggedinUserId:any;


  constructor(private login:LoginService, private formBuilder:FormBuilder,private router: Router,private matDialogRef:MatDialog){}

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }

  openDialog(){
    this.matDialogRef.open(PopUpComponent,{
      data : {
        message : 'Successfully Login'
      }
    });
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



        sessionStorage.setItem('userType',JSON.stringify(this.result.user_type))
        sessionStorage.setItem("userId",JSON.stringify(this.result.user_id))
        sessionStorage.setItem('isLoggedin',JSON.stringify(this.result.result))
        sessionStorage.setItem("token",JSON.stringify(this.result.access_token))
        sessionStorage.setItem('expireAt',JSON.stringify(this.result.expires_at))
        sessionStorage.setItem("expireIn",JSON.stringify(this.result.expires_in))

        console.warn(this.result);



        this.router.navigateByUrl("");
        this.openDialog()



      },(error)=>{
        console.warn(error);
        this.isInvalid=true;
      }
      )

    }

  }

}
