import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { EmployerSignupService } from '../../services/signup/employer-signup.service';

@Component({
  selector: 'app-edit-employer-profile',
  templateUrl: './edit-employer-profile.component.html',
  styleUrls: ['./edit-employer-profile.component.css']
})
export class EditEmployerProfileComponent {

  submitted=false

  employer:any;
  data:any;

  user:{ type: String; id: Number; } ={type: "",id:-1}

  name:String="";
  address:String="";
  email:String="";
  phone:String="";
  logo:any;

  isRegistrationComplted=false;


  constructor(private signup:EmployerSignupService,private route:ActivatedRoute,private matDialogRef:MatDialog,private router: Router){

  }

  ngOnInit():void{



     this.user={
      type:this.route.snapshot.params['type'],
      id:this.route.snapshot.params['id']
    }


    console.warn(this.user.id)
    this.getUserData(this.user.id);

    this.invokeStripe();
  }

  // paymentRequest: google.payments.api.PaymentDataRequest = {
  //   apiVersion: 2,
  //   apiVersionMinor: 0,
  //   allowedPaymentMethods: [
  //     {
  //       type: 'CARD',
  //       parameters: {
  //         allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
  //         allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
  //       },
  //       tokenizationSpecification: {
  //         type: 'PAYMENT_GATEWAY',
  //         parameters: {
  //           gateway: 'example',
  //           gatewayMerchantId: 'exampleGatewayMerchantId'
  //         }
  //       }
  //     }
  //   ],
  //   merchantInfo: {
  //     merchantId: '12345678901234567890',
  //     merchantName: 'Demo Merchant'
  //   },
  //   transactionInfo: {
  //     totalPriceStatus: 'FINAL',
  //     totalPriceLabel: 'Total',
  //     totalPrice: '100.00',
  //     currencyCode: 'USD',
  //     countryCode: 'US'
  //   },
  //   callbackIntents: ['PAYMENT_AUTHORIZATION']
  // };

  // onLoadPaymentData = (
  //   event: Event
  // ): void => {
  //   const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
  //   console.log('load payment data', eventDetail.detail);
  // }

  // onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
  //   paymentData
  //   ) => {
  //     console.log('payment authorized', paymentData);
  //     return {
  //       transactionState: 'SUCCESS'
  //     };
  //   }

  // onError = (event: ErrorEvent): void => {
  //   console.error('error', event.error);
  // }

  pay(){
const paymentHandler=(<any>window).StripeCheckout.configure({
  key:'pk_test_51MtkkIHwFsfYf0IYnGXNop7CWntRg7g3icwU5EaM1OC1hXu4mdkPSBCyn3YC7cstoa15ku8dcyr5CHiSWJH35BRH00HLcmSsBm',
  locale:'auto',
  token: (stripeToken: any) => {
    console.warn(stripeToken.card);
    console.warn("token generated");
    this.updateVerification();
  }


})

paymentHandler.open({
  name: 'Phoenix',
  description: 'Registration',
  amount: 1000,
});
  }

  invokeStripe(){
    if(!window.document.getElementById('stripe-script')){
      const script=window.document.createElement('script');
      script.id='stripe-script';
      script.type='text/javascript';
      script.src="";
      window.document.body.appendChild(script);
    }
  }

  updateVerification () {
    let data={
      "id":this.user.id,
      "verification":true,
    }
    console.warn(data)

    this.signup.UpdateVerification(data,this.user.id).subscribe((res:any)=>{
      this.employer=res;
      if(res==true){
      this.getUserData(this.user.id);
      this.openDialogforPayment();
      }
    }
    )
  }

  openDialogforPayment(){

    this.matDialogRef.open(PopUpComponent,{
      data : {
        message : 'Successfully Completed Your Registration'
      }
    });
  }

  getUserData(id:Number):void{

    this.data={
      "id":id
    }
    console.warn(this.data)
    this.signup.GetProfileData(this.data).subscribe((data:any)=>{
      this.employer=data;
      console.log(this.employer);
      this.name=this.employer.name;
      this.address=this.employer.address;
      this.email=this.employer.email;
      this.phone=this.employer.phone;
      this.logo=this.employer.logo;
      this.isRegistrationComplted=this.employer.verification;


    })

  }

  changeLogo(event:any){
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertImageToBase64(file)
  }

  convertImageToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((d) => {
      console.warn(d)
      this.logo = d
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }


  changeName(event:any){
this.name=event.target.value;
  }
  changeAddress(event:any){
 this.address=event.target.value;
  }

  changeEmail(event:any){
this.email=event.target.value;
  }

  changePhone(event:any){
this.phone=event.target.value;
  }


  onSubmit(){
    this.submitted = true



    let profileData={
      "id":this.user.id,
      "name":this.name,
      "address":this.address,
       "email":this.email,
       "phone":this.phone,
       "logo":this.logo
    }
    console.warn(profileData)

    this.signup.UpdateProfileData(profileData,this.user.id).subscribe((res:any)=>{
      this.employer=res;
      if(res==true){
      this.getUserData(this.user.id);
      this.openDialog()
      }
    }
    )
  }

  openDialog(){

    this.matDialogRef.open(PopUpComponent,{
      data : {
        message : 'Successfully Updated'
      }
    });
  }
}
