import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JobseekerSignupService } from '../services/signup/jobseeker-signup.service';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-applied-jobseeker-data',
  templateUrl: './applied-jobseeker-data.component.html',
  styleUrls: ['./applied-jobseeker-data.component.css']
})
export class AppliedJobseekerDataComponent {

  id:any;
  jobseekerData:any;
  certificates:any;

  constructor(private matDialogRef:MatDialog,private jobseekerService:JobseekerSignupService,private route: ActivatedRoute,private router: Router){

  }

  ngOnInit():void{


    this.route.params.subscribe(params => {
      this.id = params['jsid'];
    });

    console.warn(this.id)
    this.getJobseekerDataById(this.id)
  }

  getJobseekerDataById(id:any){

    this.jobseekerService.GetJobseekerDataById(id).subscribe((data)=>{
this.jobseekerData=data;
console.warn(this.jobseekerData)
this.certificates=this.jobseekerData.certificate;
    })

  }

  downloadPDF() {
    const url = this.jobseekerData.cv;
    const filename = 'cv.pdf';

    console.warn(filename)

    fetch(url).then(res => res.blob()).then(blob => {
      saveAs(blob, filename);
    });
  }


  //for show certificates
  currentSlide = 0;

  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? (this.certificates.length - 1) : (this.currentSlide - 1);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === this.certificates.length - 1) ? 0 : (this.currentSlide + 1);
  }

}
