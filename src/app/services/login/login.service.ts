import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedin:Boolean | undefined;
  loggedinUserType:String="";
  userId:any;




  constructor(private http:HttpClient) { }

  Login(data:any){
    return this.http.post("http://localhost:8080/login",data).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage=''
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        errorMessage='Invalid Email or Password.'
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errorMessage));
  }



}
