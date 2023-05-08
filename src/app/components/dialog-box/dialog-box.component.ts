import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { EmployerServiceService } from '../../services/employer-service.service';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
  id;
  companyId;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private employerService:EmployerServiceService,private matDialogRef:MatDialog) {
    this.id = data.id

    this.companyId=sessionStorage.getItem('userId')
  }

  openDialog(){
    this.matDialogRef.open(PopUpComponent,{
      data : {
        message : 'Deleted'
      }
    });
  }

  delete(id:any){
    this.employerService.deleteVacancy(id).subscribe((res)=>{
          console.warn(res);

          if(res==true){
            this.matDialogRef.closeAll();
            window.location.reload();
            this.openDialog();
          }
        })
  }
}
