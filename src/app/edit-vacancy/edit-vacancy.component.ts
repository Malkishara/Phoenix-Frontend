import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { EmployerServiceService } from '../services/employer-service.service';
import { JobVacanciesService } from '../services/job-vacancies.service';

@Component({
  selector: 'app-edit-vacancy',
  templateUrl: './edit-vacancy.component.html',
  styleUrls: ['./edit-vacancy.component.css']
})
export class EditVacancyComponent {

  updateJob!:FormGroup;
  submitted=false;

  vacancy:any;
  vacancyData:any;

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
  cid:any;
  companyId:any;

  jobCategoryList:any;
  jobModalityList:any;
  jobTypeList:any;


  constructor(private formBuilder:FormBuilder,private matDialogRef:MatDialog,private employerService:EmployerServiceService,private vacancyService:JobVacanciesService,private route: ActivatedRoute,private router: Router){

  }

  ngOnInit():void{


    this.route.params.subscribe(params => {
      this.id = params['vid'];
    });

    console.warn(this.id)
    this.getVacancyById(this.id);

    this.vacancyService.categories().subscribe((data)=>{
      this.jobCategoryList=data;
    });
    this.vacancyService.modality().subscribe((data)=>{
      this.jobModalityList=data;
    });
    this.vacancyService.types().subscribe((data)=>{
      this.jobTypeList=data;
    });

    this.cid=sessionStorage.getItem('userId');
    this.companyId=parseInt(this.cid)

    this.updateJob = this.formBuilder.group({
      jobTitle:[''],
      salaryRange:[''],
      jobDescription:[''],
      category:[''],
      modality:[''],
      type:[''],

    })


  }
  getVacancyById(id:any){
console.warn(id)
this.employerService.getVacancyById(id).subscribe((data:any)=>{
  this.vacancyData=data;
  console.log(this.vacancyData)
  this.jobCategory=this.vacancyData.category;
  this.company=this.vacancyData.company;
  this.jobDescription=this.vacancyData.description;
  this.jobModality=this.vacancyData.modality;
  this.salaryRange=this.vacancyData.salaryRange;
  this.jobTitle=this.vacancyData.title;
  this.jobType=this.vacancyData.type;
  this.category=this.vacancyData.category.id;
  this.type=this.vacancyData.type.id;
  this.modality=this.vacancyData.modality.id;

}
)
  }

  changeTitle(event:any){
    this.jobTitle=event.target.value;

  }

  changeSalary(event:any){
    this.salaryRange=event.target.value;

  }

  changeCategory(event:any){
    console.warn(event.target.value)

this.category=event.target.value;
  }

  changeModality(event:any){
    console.warn(event.target.value)
    this.modality=event.target.value;
  }

  changeType(event:any){

    this.type=event.target.value;
  }

  changeDescription(event:any){

    this.jobDescription=event.target.value;
  }

  openDialog(){
    this.matDialogRef.open(PopUpComponent,{
      data : {
        message : 'Successfully Updated'
      }
    });
  }

  updateVacancy(){
    this.submitted = true



  this.vacancy={
    "id":this.id,
    "company":this.companyId,
   "title":this.jobTitle,
   "description":this.jobDescription,
   "salaryRange":this.salaryRange,
   "category":this.category,
   "modality":this.modality,
   "type":this.type

  }

  console.warn(this.vacancy)

  this.employerService.updateVacancy(this.vacancy,this.id).subscribe((res)=>{
    console.warn(res);

    if(res==true){
      this.router.navigateByUrl("");
      this.openDialog();
    }
  })
  }

}
