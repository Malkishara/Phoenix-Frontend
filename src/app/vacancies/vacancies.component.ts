import { Component } from '@angular/core';
import { JobVacanciesService } from '../services/job-vacancies.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent {
  categoryData:any;
  jobCategories:any;//for use categories data
  vacancyData:any;
  allData:any;//for use vacancies data

  //ReadMore:boolean=true;//for show & hide more details
  visible:boolean=false;//hide more details

  //for pagination
  page:number=1;
  count:number=0;
  tableSize:number=5;


  constructor(private categories:JobVacanciesService){}

  ngOnInit():void{
    this.postCategories();
    this.postVacancyData();
  }

  //fetch categories
  postCategories():void{
  this.categories.categories().subscribe((data)=>{
    this.categoryData=data;
    this.jobCategories=this.categoryData.categories;
    console.warn(this.jobCategories);
  });
  }


   //fetch vacancies
  postVacancyData():void{
    this.categories.vacancies().subscribe((data)=>{
      this.vacancyData=data;
      this.allData=this.vacancyData.vacancies;
      console.warn(this.allData);
      console.warn(this.allData.length);
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
  onClick(id:any){


    for(let i:number=0;i<this.allData.length;i++){

      if(id==this.allData[i].vacancy_id ){
        console.warn(this.allData[i].description);
        //this.ReadMore=!this.ReadMore;
        this.visible=!this.visible;

      }
    }
  }

}
