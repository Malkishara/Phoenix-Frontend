import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { EmployerSignupService } from '../services/signup/employer-signup.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';


@Component({
  selector: 'app-employer-signup',
  templateUrl: './employer-signup.component.html',
  styleUrls: ['./employer-signup.component.css']
})
export class EmployerSignupComponent {
  registerForm!:FormGroup
  title = 'angularvalidate';
  submitted=false
  logo!:Observable<any>;

  name:String="";
  address:String="";
  email:String="";
  phoneNumber:String="";
  password:String="";
  confirmPassword:String="";
  selectedFile!: File;

  isPasswordTrue:boolean=true;
  isEmailTrue:boolean=true;

  result:any;

  constructor(private signup:EmployerSignupService,private formBuilder:FormBuilder,private router: Router,private matDialogRef:MatDialog){}

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      name:['',Validators.required],
      address:['',Validators.required],
      phoneNumber:['',[Validators.required,Validators.maxLength(11),Validators.minLength(11)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',[Validators.required,Validators.minLength(8)]],
      logo:['',Validators.required]
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
      this.logo = d
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
      let signupData={
        "name":this.name,
        "address":this.address,
        "email":this.email,
        "phone":this.phoneNumber,
        "logo":this.logo,
        "password":this.password,
        "confirmPassword":this.confirmPassword

      };
       console.warn(signupData);
       this.isPasswordTrue=true;
      this.isEmailTrue=true;
      this.signup.Signup(signupData).subscribe((res:any)=>{
        this.result=res;
        if(this.result=="1"){
        this.router.navigateByUrl("");
        this.openDialog()

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
