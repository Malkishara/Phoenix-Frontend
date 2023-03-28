import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  url='http://localhost:8080';

  constructor(private http:HttpClient) { }


  //post a request
addRequest(data:any){
  return this.http.post(this.url+"/request",data)
}
}
