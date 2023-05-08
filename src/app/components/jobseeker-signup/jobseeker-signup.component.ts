import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { JobseekerSignupService } from '../../services/signup/jobseeker-signup.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-jobseeker-signup',
  templateUrl: './jobseeker-signup.component.html',
  styleUrls: ['./jobseeker-signup.component.css']
})
export class JobseekerSignupComponent {
  registerForm!:FormGroup
  submitted=false
  cv!:Observable<any>;

  firstName:String="";
  lastName:String="";
  email:String="";
  phoneNumber:String="";
  password:String="";
  confirmPassword:String="";

  isPasswordTrue:boolean=true;
  isEmailTrue:boolean=true;

  result:any;
  constructor(private signup:JobseekerSignupService,private formBuilder:FormBuilder,private router: Router,private matDialogRef:MatDialog){}

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      phoneNumber:['',[Validators.required,Validators.minLength(11),Validators.minLength(11)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',[Validators.required,Validators.minLength(8)]],
      cv:['',Validators.required]
    })
  }

  onSelectFile(event:any){
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBase64(file)
  }
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((d) => {
      console.warn(d)
      this.cv = d
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
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
      let userData={
              "firstName":this.firstName,
              "lastName":this.lastName,
              "email":this.email,
              "phone":this.phoneNumber,
              "cv":this.cv,
              "password":this.password,
              "confirmPassword":this.confirmPassword

            };



       this.isPasswordTrue=true;
      this.isEmailTrue=true;
      this.signup.Signup(userData).subscribe((res:any)=>{
        this.result=res;
        if(this.result=="1"){
          this.router.navigateByUrl("verification/jobseeker");

        }else if(this.result=="2"){
          this.isEmailTrue=false;
          this.result=="";
        }else if(this.result=="3"){
          this.isPasswordTrue=false;
          this.result=="";
        }


      }
      )


    }

  }

}
