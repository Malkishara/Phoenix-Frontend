import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  verify(data:any,user:any){
    return this.http.post("http://localhost:8080/verify/"+user,data)
  }
}
