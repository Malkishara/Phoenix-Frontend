import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { UnsuccessPopupComponent } from '../unsuccess-popup/unsuccess-popup.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm!:FormGroup;
  submitted=false;

  password:any;
  confirmPassword:any;

  result:any;
  user:any;

  constructor(private formBuilder:FormBuilder,private router: Router,private matDialogRef:MatDialog,private email:EmailService,private route:ActivatedRoute){}

  ngOnInit(){
    this.resetPasswordForm = this.formBuilder.group({
      password:['',Validators.required],
      confirmPassword:['',Validators.required],

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

    if(this.resetPasswordForm.invalid){
      return
    }else{

      if(this.password==this.confirmPassword){
        console.warn(this.password);
        this.email.updatePassword(this.password).subscribe((res)=>{
         console.warn(res);
         if(res==true){

           this.router.navigateByUrl("");
           this.openDialog("New password updated")
           }
        })
      }else{
        this.openErrorDialog("Confirm password not matching with password")
      }


    }

  }


}
