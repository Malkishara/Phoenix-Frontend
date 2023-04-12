import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { UnsuccessPopupComponent } from '../unsuccess-popup/unsuccess-popup.component';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent {
  registerForm!:FormGroup;
  title = 'angularvalidate';
  submitted=false;

  verificationCode:any;

  result:any;
  user:any;

  constructor(private formBuilder:FormBuilder,private router: Router,private matDialogRef:MatDialog,private email:EmailService,private route:ActivatedRoute){}

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      verificationCode:['',Validators.required],

    })

    this.user={
      userType:this.route.snapshot.params['user'],

    }
  }

  openDialog(message:any){
    this.matDialogRef.open(PopUpComponent,{
      data : {
        message : message
      }
    });
  }

  openErrorDialog(message:any){
    this.matDialogRef.open(UnsuccessPopupComponent,{
      data : {
        message : message
      }
    });
  }

  onSubmit(){

    this.submitted = true

    if(this.registerForm.invalid){
      return
    }else{

       console.warn(this.verificationCode);
     this.email.verify(this.verificationCode,this.user.userType).subscribe((res)=>{
      console.warn(res);
      if(res==true){
        this.router.navigateByUrl("");
        this.openDialog("Successfully registered")

        }else{
          this.openErrorDialog("Please enter correct verification code")
        }
     })

    }

  }

  resendCode(){
   this.email.resend(this.user.userType).subscribe((res)=>{
    console.warn(res);
    if(res==true){
        this.openDialog("Resent Verification Code")
    }
   })
  }

}
