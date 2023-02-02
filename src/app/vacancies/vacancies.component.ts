import { Component } from '@angular/core';
import { JobVacanciesService } from '../services/job-vacancies.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent {
  categoryData:any;
  jobCategories:any;
  constructor(private jobVacancies:JobVacanciesService){
    this.jobVacancies.vacancies().subscribe((data)=>{
      console.warn("data",data);
      this.categoryData=data;

      this.jobCategories=this.categoryData.category;
      console.warn(this.jobCategories)
    });
  }


}
