import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class JobVacanciesService {

  url='http://localhost:8080';

  constructor(private http:HttpClient) { }

  //get categories data
  categories(){
   return this.http.get(this.url+"/categories")
  }

  //get vacancies data
  vacancies(){
    return this.http.get(this.url+"/vacancy")
   }
//get job types
types(){
  return this.http.get(this.url+"/types")
}

//get job modality
modality(){
  return this.http.get(this.url+"/modalities")
}

//search vacancies by company
searchByCompany(companyId:any){
  return this.http.get(this.url+"/company/"+companyId)
}

//search vacancies by selected data
searchBySelectedData(data:any){
  return this.http.post(this.url+"/search_data",data)
}
//post a vacancy
addVacancy(data:any){
  return this.http.post(this.url+"/vacancy",data)
}

}
