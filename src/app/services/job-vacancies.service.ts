import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class JobVacanciesService {



  // url='https://jsonplaceholder.typicode.com/users';
  url='http://localhost:3002/vacancies';

  constructor(private http:HttpClient) { }

  vacancies(){
   return this.http.get(this.url)
  }
}
