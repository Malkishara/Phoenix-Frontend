import { Component } from '@angular/core';
import { JobVacanciesService } from '../services/job-vacancies.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent {
  categoryData:any;
  jobCategories:any;//for use categories data
  vacancyData:any;
  allData:any;//for use vacancies data
  categorySelected:any;//for select category
  types:any;
  jobTypes:any;//for show job types
  typeSelected:any;//for select type



  //ReadMore:boolean=true;//for show & hide more details
  visible:boolean=false;//hide more details

  //for pagination
  page:number=1;
  count:number=0;
  tableSize:number=5;


  constructor(private categories:JobVacanciesService){}

  ngOnInit():void{
    this.postCategories();
    this.postVacancyData();
    this.postJobTypes();
  }

  //fetch categories
  postCategories():void{
  this.categories.categories().subscribe((data)=>{
    this.categoryData=data;
    this.jobCategories=this.categoryData.categories;
    console.warn(this.jobCategories);
    this.categorySelected=null;
  });
  }


   //fetch vacancies
  postVacancyData():void{



    this.categories.vacancies().subscribe((data)=>{
      this.vacancyData=data;
      this.allData=this.vacancyData.vacancies;
      console.warn(this.allData);
      console.warn(this.allData.length);
    });
  }

  //post job type
  postJobTypes():void{
    this.categories.types().subscribe((data)=>{
      this.types=data;
      this.jobTypes=this.types.job_type;
      console.warn(this.jobTypes);
    });
  }

  //pagination start
  onTableDataChange(event:any){
    this.page=event;
    this.postVacancyData();
  }

  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.postVacancyData();
  }

  //pagination end

  //show and hide description
  onClick(id:any){

     console.warn(id)
    for(let i:number=0;i<this.allData.length;i++){

      if(id==this.allData[i].vacancy_id ){
        console.warn(this.allData[i].description);
        //this.ReadMore=!this.ReadMore;
        this.visible=!this.visible;

      }
    }
  }

  //select data according to the choosen category
  selectCategory(catId:any){
    console.warn(catId);
    if(catId==="001"){
      console.warn("true")
      this.categories.accountVacancies().subscribe((data)=>{
        this.vacancyData=data;
        this.allData=this.vacancyData.vacancies;
        console.warn(this.allData);
        console.warn(this.allData.length);
      });
     }
     else if(catId==="002"){
      console.warn("true")
      this.categories.bankingVacancies().subscribe((data)=>{
        this.vacancyData=data;
        this.allData=this.vacancyData.vacancies;
        console.warn(this.allData);
        console.warn(this.allData.length);
      });
     }
    else if(catId==="003"){
      console.warn("true")
      this.categories.hrVacancies().subscribe((data)=>{
        this.vacancyData=data;
        this.allData=this.vacancyData.vacancies;
        console.warn(this.allData);
        console.warn(this.allData.length);
      });
     }
     else if(catId==="004"){
      console.warn("true")
      this.categories.marketingVacancies().subscribe((data)=>{
        this.vacancyData=data;
        this.allData=this.vacancyData.vacancies;
        console.warn(this.allData);
        console.warn(this.allData.length);
      });
     }
     else if(catId==="005"){
      console.warn("true")
      this.categories.engineerVacancies().subscribe((data)=>{
        this.vacancyData=data;
        this.allData=this.vacancyData.vacancies;
        console.warn(this.allData);
        console.warn(this.allData.length);
      });
     }
     else if(catId==="006"){
      console.warn("true")
      this.categories.hospitalVacancies().subscribe((data)=>{
        this.vacancyData=data;
        this.allData=this.vacancyData.vacancies;
        console.warn(this.allData);
        console.warn(this.allData.length);
      });
     }
     else if(catId==="007"){
      console.warn("true")
      this.categories.hotelsVacancies().subscribe((data)=>{
        this.vacancyData=data;
        this.allData=this.vacancyData.vacancies;
        console.warn(this.allData);
        console.warn(this.allData.length);
      });
     }
     else if(catId==="008"){
      console.warn("true")
      this.categories.teachVacancies().subscribe((data)=>{
        this.vacancyData=data;
        this.allData=this.vacancyData.vacancies;
        console.warn(this.allData);
        console.warn(this.allData.length);
      });
     }
     else if(catId==="009"){
      console.warn("true")
      this.categories.environmentVacancies().subscribe((data)=>{
        this.vacancyData=data;
        this.allData=this.vacancyData.vacancies;
        console.warn(this.allData);
        console.warn(this.allData.length);
      });
     }
     else{
      console.warn("false")
      this.categories.vacancies().subscribe((data)=>{
        this.vacancyData=data;
        this.allData=this.vacancyData.vacancies;
        console.warn(this.allData);
        console.warn(this.allData.length);
      });
     }
  }

  onClickCompany(c_id:any){
    console.warn(c_id);
  }

}
