import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployerServiceService {

  vacancyId:any;

  url='http://localhost:8080';

  constructor(private http:HttpClient) { }

  getVacancies(id:any){
    return this.http.get(this.url+"/vacancies/"+id)
   }

   deleteVacancy(id:any){
    return this.http.delete(this.url+"/vacancy/"+id)
   }

   getVacancyById(id:any){
    return this.http.get(this.url+"/vacancy/"+id)
   }

   updateVacancy(data:any,id:any){
    return this.http.put("http://localhost:8080/vacancy/"+id,data);
  }


}
