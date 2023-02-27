import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { EmployerSignupComponent } from './employer-signup/employer-signup.component';
import { JobseekerSignupComponent } from './jobseeker-signup/jobseeker-signup.component'
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {path:'',component:VacanciesComponent},
  {path:'employer_signup',component:EmployerSignupComponent},
  {path:'jobseeker_signup',component:JobseekerSignupComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    VacanciesComponent,
    EmployerSignupComponent,
    JobseekerSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  providers: [

   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
