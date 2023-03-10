import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import {ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { EmployerSignupComponent } from './employer-signup/employer-signup.component';
import { JobseekerSignupComponent } from './jobseeker-signup/jobseeker-signup.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { JobSeekerProfileComponent } from './job-seeker-profile/job-seeker-profile.component';

const routes:Routes=[
  {path:'',component:VacanciesComponent},
  {path:'employer_signup',component:EmployerSignupComponent},
  {path:'jobseeker_signup',component:JobseekerSignupComponent},
  {path:'login',component:LoginComponent},
  {path:'jobseeker_profile',component:JobSeekerProfileComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    VacanciesComponent,
    EmployerSignupComponent,
    JobseekerSignupComponent,
    LoginComponent,
    PopUpComponent,
    JobSeekerProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  exports:[RouterModule],
  providers: [

   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
