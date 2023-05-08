import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { EmployerServiceService } from '../../services/employer-service.service';
import { JobVacanciesService } from '../../services/job-vacancies.service';
import { Observable, Subscriber } from 'rxjs';

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
  jobDescriptionImg:any;
  jobModality:any;
  salaryRange:any;
  lowSalaryLimit:any;
  upperSalaryLimit:any;
  jobTitle:any;
  jobType:any;
  modality:any;
  category:any;
  type:any;
  expirationDate:any;

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
      lowSalaryLimit:[''],
      upperSalaryLimit:[''],
      jobDescription:[''],
      category:[''],
      modality:[''],
      type:[''],
      expirationDate:[''],

    })


  }

  editorConfig = {
    editable: true,
    toolbarHiddenButtons: [
      ['insertVideo','insertImage','strikeThrough','indent', 'outdent','textColor','backgroundColor','fontName', 'fontSize','link', 'unlink','heading','removeFormat','insertHorizontalRule', 'toggleEditorMode']
    ]
  };

  getVacancyById(id:any){
console.warn(id)
this.employerService.getVacancyById(id).subscribe((data:any)=>{
  this.vacancyData=data;
  console.log(this.vacancyData)
  this.jobCategory=this.vacancyData.category;
  this.company=this.vacancyData.company;
  this.jobDescription=this.vacancyData.description;
  this.jobDescriptionImg=this.vacancyData.descriptionImg;
  this.jobModality=this.vacancyData.modality;
  this.salaryRange=this.vacancyData.salaryRange;
  this.jobTitle=this.vacancyData.title;
  this.jobType=this.vacancyData.type;
  this.category=this.vacancyData.category.id;
  this.type=this.vacancyData.type.id;
  this.modality=this.vacancyData.modality.id;
  this.expirationDate=this.vacancyData.expirationDate;

  var words=this.salaryRange.split(" ");
  this.lowSalaryLimit=words[0];
  this.upperSalaryLimit=words[2];
  console.warn("Low limit: "+this.lowSalaryLimit);
  console.warn("Upper limit: "+this.upperSalaryLimit)
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


  openDialog(){
    this.matDialogRef.open(PopUpComponent,{
      data : {
        message : 'Successfully Updated'
      }
    });
  }



  updateVacancy(){
    this.submitted = true

    this.salaryRange=this.lowSalaryLimit+" - "+this.upperSalaryLimit;

  this.vacancy={
    "id":this.id,
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

  this.employerService.updateVacancy(this.vacancy,this.id).subscribe((res)=>{
    console.warn(res);

    if(res==true){
      this.router.navigateByUrl("employer/"+this.companyId+"/shared");
      this.openDialog();
    }
  })
  }

}
