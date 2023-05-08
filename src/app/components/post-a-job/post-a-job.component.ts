import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { EmployerServiceService } from '../../services/employer-service.service';
import { JobVacanciesService } from '../../services/job-vacancies.service';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-post-a-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.css']
})
export class PostAJobComponent {
  postJob!:FormGroup;
  submitted=false;

  vacancy:any;

  jobCategory:any;
  company:any;
  jobDescription:any;
  jobModality:any;
  salaryRange:any;
  lowSalaryLimit:any;
  upperSalaryLimit:any;
  jobTitle:any;
  jobType:any;
  modality:any;
  category:any;
  type:any;
jobDescriptionImg:any;
expirationDate:any;

  id:any;
  companyId:any;

  jobCategoryList:any;
  jobModalityList:any;
  jobTypeList:any;


  noDescription:boolean=false;

  constructor(private formBuilder:FormBuilder,private matDialogRef:MatDialog,private employerService:EmployerServiceService,private vacancyService:JobVacanciesService,private route: ActivatedRoute,private router: Router){

  }

  ngOnInit():void{

    this.vacancyService.categories().subscribe((data)=>{
      this.jobCategoryList=data;
    });
    this.vacancyService.modality().subscribe((data)=>{
      this.jobModalityList=data;
    });
    this.vacancyService.types().subscribe((data)=>{
      this.jobTypeList=data;
    });

    this.id=sessionStorage.getItem('userId');
    this.companyId=parseInt(this.id)

    this.postJob = this.formBuilder.group({
      jobTitle:['',Validators.required],
      jobDescription:[''],
      lowSalaryLimit:['',Validators.required],
      upperSalaryLimit:['',Validators.required],
      category:['',[Validators.required]],
      modality:['',[Validators.required]],
      type:['',[Validators.required]],
      expirationDate:['',[Validators.required]]

    })

  }



  editorConfig = {
    editable: true,
    toolbarHiddenButtons: [
      ['insertVideo','insertImage','strikeThrough','indent', 'outdent','textColor','backgroundColor','fontName', 'fontSize','link', 'unlink','heading','removeFormat','insertHorizontalRule', 'toggleEditorMode']
    ]
  };

  openDialog(){
    this.matDialogRef.open(PopUpComponent,{
      data : {
        message : 'Successfully Posted Vacancy'
      }
    });
  }

  addVacancy(){
    this.submitted = true


    if(this.postJob.invalid){
      return
    }else if(this.jobDescription==null && this.jobDescriptionImg==null){
    this.noDescription=true;
    }else{
      this.salaryRange=this.lowSalaryLimit+" - "+this.upperSalaryLimit;
  this.vacancy={
    "employer":this.companyId,
   "title":this.jobTitle,
   "description":this.jobDescription,
   "descriptionImg":this.jobDescriptionImg,
   "salaryRange":this.salaryRange,
   "category":this.category,
   "modality":this.modality,
   "type":this.type,
   "expirationDate":this.expirationDate

  }

  console.warn(this.vacancy)
    }
  this.vacancyService.addVacancy(this.vacancy).subscribe((res)=>{
    console.warn(res);

    if(res==true){
      this.router.navigateByUrl("");
      this.openDialog();
    }
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
      this.jobDescriptionImg = d
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



}

