import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { LoginService } from '../../services/login/login.service';
import { RequestService } from '../../services/request.service';
import { JobseekerSignupService } from '../../services/signup/jobseeker-signup.service';

@Component({
  selector: 'app-apply-to-job',
  templateUrl: './apply-to-job.component.html',
  styleUrls: ['./apply-to-job.component.css']
})
export class ApplyToJobComponent {
  jobseekerEmail:any;
  jobSeekerProfileData:any;

  userProfile!:FormGroup
  submitted=false
  submitted1=false


  firstName:String="";
  lastName:String="";
  district:String="";
  country:String="";
  email:String="";
  phone:String="";
  profilePicture:any;
  cv!:Observable<any>;
  college:String="";
  degree:String="";
  position:String="";
  linkdin:String="";
  selectedExperience:String="";
  languages:any[]=[];
  experience:String="";
  experienceList:any;
  languagesList:any;


  //skills:{  skill: any } ={skill:""}
  skills:any[]=[];
  certifications:any[]=[];
  certificates:any[]=[];

  isSkillEmpty:Boolean=false;
  isCertificationEmpty:Boolean=false;
  numOfCertificates:any;

  userId:any;
  vacancyId:any;
  vId:any;
  uId:any;
  request:any;
  constructor(private signup:JobseekerSignupService,private loginService:LoginService,private route:ActivatedRoute,private matDialogRef:MatDialog,private router: Router,private requestService:RequestService){

  }

  ngOnInit():void{

    this.userId=sessionStorage.getItem('userId');

    this.route.params.subscribe(params => {
      this.vacancyId = params['vid'];
    });

    console.warn(this.vacancyId)
    console.warn(this.userId)
    this.getUserData(this.userId);

    this.experienceList=[{id:1,title:"Less than 6 month"},
    {id:2,title:"Less than 1 year"},
    {id:3,title:"Less than 3 year"},
    {id:4,title:"Less than 5 year"},
    {id:5,title:"More than 5 year"},]

    this.languagesList=[{id:1,select:false,language:"English"},
    {id:2,select:false,language:"Sinhala"},
    {id:3,select:false,language:"Tamil"},
    ]

    this.skills.push({skill:""});
    this.certifications.push({certification:""});
    //this.certificates.push({certificate:""});
    //this.languages.push()



  }



  getUserData(id:Number):void{

    this.signup.GetJobseekerDataById(id).subscribe((data:any)=>{
      this.jobSeekerProfileData=data;
      console.log(this.jobSeekerProfileData);
     this.firstName=this.jobSeekerProfileData.firstName;
     this.lastName=this.jobSeekerProfileData.lastName;
     this.district=this.jobSeekerProfileData.district;
     this.country=this.jobSeekerProfileData.country;
     this.email=this.jobSeekerProfileData.email;
     this.phone=this.jobSeekerProfileData.phone;
     this.cv=this.jobSeekerProfileData.cv;
     this.college=this.jobSeekerProfileData.college;
     this.degree=this.jobSeekerProfileData.degree;
     this.position=this.jobSeekerProfileData.position;
     this.linkdin=this.jobSeekerProfileData.linkdin;
     this.experience=this.jobSeekerProfileData.experience;
      this.languages=this.jobSeekerProfileData.languages;
      this.skills=this.jobSeekerProfileData.skills;
     this.certifications=this.jobSeekerProfileData.certification;
     this.certificates=this.jobSeekerProfileData.certificate;
     if(this.jobSeekerProfileData.profilePicture!=null){
      this.profilePicture=this.jobSeekerProfileData.profilePicture;
     }else{
      this.profilePicture="../assets/default_p_p.jfif";
     }


    for(let i=0;i<this.languagesList.length;i++){
      for(let j=0;j<this.languages.length;j++){
        if(this.languagesList[i].language==this.languages[j].language){
        this.languagesList[i].select=true;
        }
      }
     }


    })
this.numOfCertificates=this.certificates.length;
  }

  //convert cv to string
  onSelectCv(event:any){
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertCvToBase64(file)
  }
  convertCvToBase64(file: File) {
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

//convert profile picture
onSelectImage(event:any){
  const target = event.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];
  console.log(file);
  this.convertImageToBase64(file)
}
convertImageToBase64(file: File) {
  const observable = new Observable((subscriber: Subscriber<any>) => {
    this.readFile(file, subscriber);
  });

  observable.subscribe((d) => {
    console.warn(d)
    this.profilePicture = d
  })
}

changeFirstName(event:any){
this.firstName=event.target.value;
}
changeLastName(event:any){
  this.lastName=event.target.value;
}

changeDistrict(event:any){
    this.district=event.target.value;
}

changeCountry(event:any){
  this.country=event.target.value;
}
changeEmail(event:any){
      this.email=event.target.value;
}
changePhone(event:any){
  this.phone=event.target.value;
}

changeCollege(event:any){
  this.college=event.target.value;
  }
changeDegree(event:any){
    this.degree=event.target.value;
}
changePosition(event:any){
  this.position=event.target.value;
  }
changeLinkdin(event:any){
    this.linkdin=event.target.value;
}
changeExperience(event:any){
this.experience=event.target.value;
console.warn(this.experience)
}

selectedLanguages(event:any){
  let id=event.target.value;
  let isChecked=event.target.checked;


console.warn(id,isChecked)

this.languagesList=this.languagesList.map((l:any)=>{
  if(l.id==id){
    l.select=isChecked;
    return l;
  }
  return l;
})
console.warn(this.languagesList)
}



removeCertification(i: number){
  this.certifications.splice(i,1);
}

addCertification(){
  console.warn(this.certifications.length)
  if(this.certifications.length==0){
    this.certifications.push({certification:""});
  }else{
    let lastCertification=this.certifications[this.certifications.length-1].certification
    console.warn(lastCertification)

    if(lastCertification.length!=0 ){
    //   console.log("done")
      this.certifications.push({certification:""});
      console.warn(this.certifications)
    }else{
      this.isCertificationEmpty=true;
    }
  }


}

removeSkill(i: number){
  this.skills.splice(i,1);
}

addSkill(){
  if(this.skills.length==0){
    this.skills.push({skill:""});
  }else{
    let lastSkill=this.skills[this.skills.length-1].skill
    console.warn(lastSkill)
    if(lastSkill.length!=0 || this.skills.length==0){
    this.skills.push({skill:""});
    }else{
      this.isSkillEmpty=true;
    }
  }

  console.warn(this.skills)
}

openDialog(){

  this.matDialogRef.open(PopUpComponent,{
    data : {
      message : 'Successfully Updated'
    }
  });
}

onFileSelected(event: any) {
  if (event.target.files) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        // process the uploaded file here
        console.log(reader.result);
        this.certificates.push({certificate:reader.result})
      };
    }
  }
  console.warn(this.certificates)
}


onSubmit(){
  this.submitted = true

  for(let i=0;i<this.languagesList.length;i++){
    let lang="";
    if(this.languagesList[i].select==false){
      this.languagesList.splice(i)
    }

    console.warn(this.languagesList)
  }

  let profileData={
    "id":this.userId,
    "firstName":this.firstName,
    "lastName":this.lastName,
     "email":this.email,
     "phone":this.phone,
     "college":this.college,
     "degree":this.degree,
     "profilePicture":this.profilePicture,
     "cv":this.cv,
     "district":this.district,
     "country":this.country,
     "position":this.position,
     "linkdin":this.linkdin,
     "experience":this.experience,
     "languages":this.languagesList,
     "skills":this.skills,
     "certification":this.certifications,
     "certificate":this.certificates
  }
  console.warn(profileData)

  this.signup.UpdateProfileData(profileData,this.userId).subscribe((res:any)=>{
    this.jobSeekerProfileData=res;
    if(res==true){
    this.getUserData(this.userId);
    this.openDialog()
    }
  }
 )
}

currentSlide = 0;

  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? (this.certificates.length - 1) : (this.currentSlide - 1);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === this.certificates.length - 1) ? 0 : (this.currentSlide + 1);
  }

  openDialogForRequestSend(){

    this.matDialogRef.open(PopUpComponent,{
      data : {
        message : 'Successfully Applied for Vacancy'
      }
    });
  }

  applyForJob(){
    this.submitted1 = true


    this.vId=parseInt(this.vacancyId)
    this.uId=parseInt(this.userId)

  this.request={
    "vacancy":this.vId,
   "jobSeeker":this.uId,


  }

  console.warn(this.request)

  this.requestService.addRequest(this.request).subscribe((res)=>{
    console.warn(res);

    if(res==true){
      this.router.navigateByUrl("");
      this.openDialogForRequestSend();
    }
  })
  }
}
