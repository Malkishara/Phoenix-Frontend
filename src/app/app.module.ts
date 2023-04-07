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
import {PdfViewerModule} from 'ng2-pdf-viewer';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { EmployerProfileNavbarComponent } from './employer-profile-navbar/employer-profile-navbar.component';
import { EditEmployerProfileComponent } from './edit-employer-profile/edit-employer-profile.component';
import { SharedJobVacanciesComponent } from './shared-job-vacancies/shared-job-vacancies.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { EditVacancyComponent } from './edit-vacancy/edit-vacancy.component';
import { JobseekerRequestsComponent } from './jobseeker-requests/jobseeker-requests.component';
import { AppliedJobseekerDataComponent } from './applied-jobseeker-data/applied-jobseeker-data.component';
import { PostAJobComponent } from './post-a-job/post-a-job.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatBadgeModule } from '@angular/material/badge';
import { ApplyToJobComponent } from './apply-to-job/apply-to-job.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { UnsuccessPopupComponent } from './unsuccess-popup/unsuccess-popup.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';


const routes:Routes=[
  {path:'',component:VacanciesComponent},
  {path:'employer_signup',component:EmployerSignupComponent},
  {path:'jobseeker_signup',component:JobseekerSignupComponent},
  {path:'login',component:LoginComponent},
  {path:'post',component:PostAJobComponent},
  {path:'jobseeker/:id',component:JobSeekerProfileComponent},
  {path:'employer/:id',component:EmployerProfileComponent,children: [
    { path: '', component: EditEmployerProfileComponent },
    { path: 'shared', component: SharedJobVacanciesComponent },

  ] },
  {path:'employer/:id/shared/edit/:vid',component:EditVacancyComponent},
  {path:'employer/:id/shared/request/:vid',component:JobseekerRequestsComponent},
  {path:'employer/:id/shared/request/:vid/:jsid',component:AppliedJobseekerDataComponent},
  {path:'apply/:vid',component:ApplyToJobComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    VacanciesComponent,
    EmployerSignupComponent,
    JobseekerSignupComponent,
    LoginComponent,
    PopUpComponent,
    JobSeekerProfileComponent,
    EmployerProfileNavbarComponent,
    EditEmployerProfileComponent,
    SharedJobVacanciesComponent,
    EmployerProfileComponent,
    EditVacancyComponent,
    JobseekerRequestsComponent,
    AppliedJobseekerDataComponent,
    PostAJobComponent,
    ApplyToJobComponent,
    DialogBoxComponent,
    UnsuccessPopupComponent,

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
    ReactiveFormsModule,
    PdfViewerModule,
    MatMenuModule,
    MatButtonModule,
    AngularEditorModule,
    MatBadgeModule,
    GooglePayButtonModule,

  ],
  exports:[RouterModule],
  providers: [

   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
