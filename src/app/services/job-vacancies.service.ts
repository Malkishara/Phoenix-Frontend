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

//get hr vacancies
hrVacancies(){
  return this.http.get(this.url+"/vacancy/hr")
}

//get account vacancies
accountVacancies(){
  return this.http.get(this.url+"/vacancy/account")
}

//get banking vacancies
bankingVacancies(){
  return this.http.get(this.url+"/vacancy/banking")
}

//get marketing vacancies
marketingVacancies(){
  return this.http.get(this.url+"/vacancy/marketing")
}

//get engineering vacancies
engineerVacancies(){
  return this.http.get(this.url+"/vacancy/engineering")
}

//get hospital vacancies
hospitalVacancies(){
  return this.http.get(this.url+"/vacancy/hospital")
}

//get hotels vacancies
hotelsVacancies(){
  return this.http.get(this.url+"/vacancy/hotels")
}
//get teaching vacancies
teachVacancies(){
  return this.http.get(this.url+"/vacancy/teaching")
}

//get environment vacancies
environmentVacancies(){
  return this.http.get(this.url+"/vacancy/environment")
}

//get remote vacancies
remoteVacancies(){
  return this.http.get(this.url+"/modality/remote")
}

//get office vacancies
officeVacancies(){
  return this.http.get(this.url+"/modality/office")
}
}
