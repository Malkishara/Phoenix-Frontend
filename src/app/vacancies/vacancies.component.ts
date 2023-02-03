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

  constructor(private categories:JobVacanciesService){
    //fetch categories
    this.categories.categories().subscribe((data)=>{
      this.categoryData=data;
      this.jobCategories=this.categoryData.categories;
      console.warn(this.jobCategories);
    });

    //fetch vacancies
    this.categories.vacancies().subscribe((data)=>{
      this.vacancyData=data;
      this.allData=this.vacancyData.vacancies;
      console.warn(this.allData);
    });
  }


}
