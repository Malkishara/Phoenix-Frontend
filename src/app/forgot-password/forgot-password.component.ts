import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { UnsuccessPopupComponent } from '../unsuccess-popup/unsuccess-popup.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  forgotPassword!:FormGroup;
  submitted=false;

  emailAddress:any;

  result:any;
  constructor(private formBuilder:FormBuilder,private router: Router,private matDialogRef:MatDialog,private email:EmailService,private route:ActivatedRoute){}

  ngOnInit(){
    this.forgotPassword = this.formBuilder.group({
      emailAddress:['',[Validators.required,Validators.email]]

    })


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

    if(this.forgotPassword.invalid){
      return
    }else{

       console.warn(this.emailAddress);
     this.email.forgotPassword(this.emailAddress).subscribe((res)=>{
      console.warn(res);
      if(res==true){
        this.router.navigateByUrl("verification");

        }else{
          this.openErrorDialog("Please enter correct email address")
        }
     })

    }

  }
}
