import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { EmployerServiceService } from '../../services/employer-service.service';
import { JobseekerSignupService } from '../../services/signup/jobseeker-signup.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-shared-job-vacancies',
  templateUrl: './shared-job-vacancies.component.html',
  styleUrls: ['./shared-job-vacancies.component.css']
})
export class SharedJobVacanciesComponent {
vacancyData:any;
companyId:any;

 numberOfRequest:any;
 request:any;

visible:boolean=false;//hide more details
vacancySelected?:any;//for more datails

  constructor(private matDialogRef:MatDialog,private employerService:EmployerServiceService,private router: Router){

  }

  ngOnInit():void{


    this.companyId=sessionStorage.getItem('userId')

    console.warn(this.companyId)
    this.getVacancyData(this.companyId);


    // this.numRequest=4;

  }



  getVacancyData(id:Number):void{


    console.warn(id)
    this.employerService.getVacancies(id).subscribe((data:any)=>{
      this.vacancyData=data;
      console.log(this.vacancyData);

    })

  }

  //show and hide description
  onClick(data:any):void{

    console.warn(data);
     data.visible=!data.visible;

 }



openConfirmBox(id:any){
  this.matDialogRef.open(DialogBoxComponent,{
    data:{
      id:id
    }
  });
}
 deleteVacancy(id:any){

this.openConfirmBox(id);

  // if(confirm('Are you sure, you want to delete this vacancy ?')){
  //   this.employerService.deleteVacancy(id).subscribe((res)=>{
  //     console.warn(res);

  //     if(res==true){
  //   this.openDialog();
  //   this.getVacancyData(this.companyId);
  //     }
  //   })
  //  }
 }

 editVacancy(vid:any){

  this.router.navigateByUrl("employer/"+this.companyId+"/shared/edit/"+vid);

 }



 showRequests(vid:any){
  this.router.navigateByUrl("employer/"+this.companyId+"/shared/request/"+vid);
 }



}
