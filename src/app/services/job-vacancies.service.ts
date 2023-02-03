import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class JobVacanciesService {

  url='http://localhost:3002';

  constructor(private http:HttpClient) { }

  vacancies(){
   return this.http.get(this.url+"/category")
  }
}
