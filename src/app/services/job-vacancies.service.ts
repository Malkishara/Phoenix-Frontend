import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class JobVacanciesService {

  url='http://localhost:3002';

  constructor(private http:HttpClient) { }

  //get categories data
  categories(){
   return this.http.get(this.url+"/category")
  }

  //get vacancies data
  vacancies(){
    return this.http.get(this.url+"/vacancies")
   }
//get job types
types(){
  return this.http.get(this.url+"/types")
}

//get job modality
modality(){
  return this.http.get(this.url+"/modality")
}


}
