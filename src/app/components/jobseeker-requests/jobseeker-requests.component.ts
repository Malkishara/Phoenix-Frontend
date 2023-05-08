import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerServiceService } from '../../services/employer-service.service';

@Component({
  selector: 'app-jobseeker-requests',
  templateUrl: './jobseeker-requests.component.html',
  styleUrls: ['./jobseeker-requests.component.css']
})
export class JobseekerRequestsComponent {

  vid:any;
  requests:any;
  companyId:any;


  constructor(private matDialogRef:MatDialog,private employerService:EmployerServiceService,private route: ActivatedRoute,private router: Router){

  }

  ngOnInit():void{


    this.route.params.subscribe(params => {
      this.vid = params['vid'];
    });

    console.warn(this.vid)

    this.companyId=sessionStorage.getItem('userId')

    this.getRequests(this.vid)
  }

  getRequests(id:any){
  this.employerService.getRequestsByVacancyId(id).subscribe((data)=>{
    this.requests=data;
    console.warn(this.requests);
  })
  }


  onClick(id:any):void{

    console.warn(id)
    this.router.navigateByUrl("employer/"+this.companyId+"/shared/request/"+this.vid+"/"+id);

 }

}
