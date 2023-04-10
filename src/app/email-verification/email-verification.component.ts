import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { PopUpComponent } from '../pop-up/pop-up.component';

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

  openDialog(){
    this.matDialogRef.open(PopUpComponent,{
      data : {
        message : 'Registration Successfull'
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
        this.openDialog()

        }
     })

    }

  }

}
