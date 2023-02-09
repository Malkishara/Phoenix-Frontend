import { Component } from '@angular/core';
import { JobVacanciesService } from '../services/job-vacancies.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent {
  jobCategories:any;//for use categories data
  vacancyData:any;
  allVacancyData:any;//for use vacancies data
  categorySelected:any;//for select category
  jobTypes:any;//for show job types
  jobModality:any;//for show job modality
  typeSelected:any;//for select type
  vacancySelected?:any;//for more datails


  visible:boolean=false;//hide more details

  //for pagination
  page:number=1;
  count:number=0;
  tableSize:number=5;


  constructor(private categories:JobVacanciesService){}

  ngOnInit():void{
    this.postCategories();
    this.postVacancyData();
    this.postJobTypes();
    this.postJobModality();
  }

  //fetch categories
  postCategories():void{
  this.categories.categories().subscribe((data)=>{
    this.jobCategories=data;
    console.warn(this.jobCategories);
    this.categorySelected=null;
  });
  }



   //fetch vacancies
  postVacancyData():void{
    this.categories.vacancies().subscribe((data)=>{
      this.vacancyData=data;
      this.allVacancyData=this.vacancyData
      console.warn(this.allVacancyData);

    });
  }

  //post job type
  postJobTypes():void{
    this.categories.types().subscribe((data)=>{
      this.jobTypes=data;
      console.warn(this.jobTypes);
    });
  }

  //post job modality
  postJobModality():void{
    this.categories.modality().subscribe((data)=>{
      this.jobModality=data;
      console.warn(this.jobModality);
    });
  }

  //pagination start
  onTableDataChange(event:any){
    this.page=event;
    this.postVacancyData();
  }

  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.postVacancyData();
  }

  //pagination end

  //show and hide description
  onClick(data:any):void{

     console.warn(data)
     this.vacancySelected=data;
     this.visible=!this.visible;

  }





  }


