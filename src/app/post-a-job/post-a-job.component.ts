import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { EmployerServiceService } from '../services/employer-service.service';
import { JobVacanciesService } from '../services/job-vacancies.service';

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
  jobTitle:any;
  jobType:any;
  modality:any;
  category:any;
  type:any;


  id:any;
  companyId:any;

  jobCategoryList:any;
  jobModalityList:any;
  jobTypeList:any;


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
      salaryRange:['',Validators.required],
      jobDescription:['',[Validators.required]],
      category:['',[Validators.required]],
      modality:['',[Validators.required]],
      type:['',[Validators.required]],

    })



  }



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
    }else{
  this.vacancy={
    "company":this.companyId,
   "title":this.jobTitle,
   "description":this.jobDescription,
   "salaryRange":this.salaryRange,
   "category":this.category,
   "modality":this.modality,
   "type":this.type

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

}

