import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-unsuccess-popup',
  templateUrl: './unsuccess-popup.component.html',
  styleUrls: ['./unsuccess-popup.component.css']
})
export class UnsuccessPopupComponent {

  message;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
    this.message = data.message
  }

  ngOnInit(): void {
  }
}
