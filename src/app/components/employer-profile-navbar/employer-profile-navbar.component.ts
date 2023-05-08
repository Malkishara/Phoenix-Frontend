import { Component } from '@angular/core';

@Component({
  selector: 'app-employer-profile-navbar',
  templateUrl: './employer-profile-navbar.component.html',
  styleUrls: ['./employer-profile-navbar.component.css']
})
export class EmployerProfileNavbarComponent {
id:any;
collapsed = true;

ngOnInit():void{
  this.id=sessionStorage.getItem('userId')
}
}