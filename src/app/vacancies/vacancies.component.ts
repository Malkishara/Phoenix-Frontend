import { Component } from '@angular/core';
import { empty } from 'rxjs';
import { JobVacanciesService } from '../services/job-vacancies.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent {
  jobCategories:any;//for use categories data
  vacancyData:any;
  allVacancyData:any;//for use vacancies data
  categorySelected:any;//for select category
  jobTypes:any;//for show job types
  jobModality:any;//for show job modality
  typeSelected:Array<String>=[];//for select type
  modalitySelected:Array<String>=[];//for select modality
  vacancySelected?:any;//for more datails
  isSelected:boolean=false;
  selectedJobType:any;


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
    this.postJobModality();
  }

  //fetch categories
  postCategories():void{
  this.categories.categories().subscribe((data)=>{
    this.jobCategories=data;
    console.warn(this.jobCategories);
    this.categorySelected=null;
  });
  }



   //fetch vacancies
  postVacancyData():void{
    this.categories.vacancies().subscribe((data)=>{
      this.vacancyData=data;
      this.allVacancyData=this.vacancyData
      console.warn(this.allVacancyData);

    });
  }

  //post job type
  postJobTypes():void{
    this.categories.types().subscribe((data)=>{
      this.jobTypes=data;
      console.warn(this.jobTypes);
    });
  }

  //post job modality
  postJobModality():void{
    this.categories.modality().subscribe((data)=>{
      this.jobModality=data;
      console.warn(this.jobModality);
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
  onClick(data:any):void{

     console.warn(data)
     this.vacancySelected=data.id;
     this.visible=!this.visible;

  }

//search functionality
selectCategory(selectedCategoryId:any):void{
console.log("search function... ")
console.log(selectedCategoryId)

this.allVacancyData=[];

for(let k=0;k<this.vacancyData.length;k++){
  var allSelectedModality=[];
  var popedModalityElement;
  for(let p=this.modalitySelected.length-1;p>-1;p--){
    popedModalityElement=this.modalitySelected.pop();
    if(popedModalityElement!=null){
      allSelectedModality.push(popedModalityElement);
    }
  }
  console.log(allSelectedModality)

  if(allSelectedModality.length!=0){
    for(let q=0;q<allSelectedModality.length;q++){



        var allSelectedTypes=[];
        var popedTypesElement;
        for(let r=this.typeSelected.length-1;r>-1;r--){
       popedTypesElement=this.typeSelected.pop();
       if(popedTypesElement!=null){
        allSelectedTypes.push(popedTypesElement);
    }
  }
  console.log(allSelectedTypes)
      if(allSelectedTypes.length!=0){

        for(let s=0;s<allSelectedTypes.length;s++){

          if(selectedCategoryId!=null){
            if(selectedCategoryId==this.vacancyData[k].category.id && allSelectedTypes[s]==this.vacancyData[k].type.id && allSelectedModality[q]==this.vacancyData.modality.id){
              this.allVacancyData.push(this.vacancyData[k])
            }
          }else{
            if(allSelectedTypes[s]==this.vacancyData[k].type.id && allSelectedModality[q]==this.vacancyData[k].modality.id){
              this.allVacancyData.push(this.vacancyData[k])
            }
          }




        }

      }else{
        if(selectedCategoryId!=null){
          if(selectedCategoryId==this.vacancyData[k].category.id && allSelectedModality[q]==this.vacancyData[k].modality.id){
            this.allVacancyData.push(this.vacancyData[k])
          }
        }else{
          if(allSelectedModality[q]==this.vacancyData[k].modality.id){
            this.allVacancyData.push(this.vacancyData[k])
          }
        }
      }

    }

  }else{
    var allSelectedTypes=[];
    var popedTypesElement;
    for(let r=this.typeSelected.length-1;r>-1;r--){
   popedTypesElement=this.typeSelected.pop();
   if(popedTypesElement!=null){
    allSelectedTypes.push(popedTypesElement);
}
}
console.log(allSelectedTypes)
  if(allSelectedTypes.length!=0){

    for(let s=0;s<allSelectedTypes.length;s++){

      if(selectedCategoryId!=null){
        if(selectedCategoryId==this.vacancyData[k].category.id && allSelectedTypes[s]==this.vacancyData[k].type.id){
          this.allVacancyData.push(this.vacancyData[k])
        }
      }else{
        if(allSelectedTypes[s]==this.vacancyData[k].type.id ){
          this.allVacancyData.push(this.vacancyData[k])
        }
      }


    }

  }else{
    if(selectedCategoryId!=null){
      if(selectedCategoryId==this.vacancyData[k].category.id){
        this.allVacancyData.push(this.vacancyData[k])
      }
    }
  }
  }
}

console.log(this.allVacancyData)
}

//select type
selectJobType(data:any):void{

console.log(data);
var num=0;
for(let i=0;i<this.typeSelected.length;i++){
  if(data==this.typeSelected[i]){
   delete this.typeSelected[i];
   num++;
  }
}
if(num==0){
  this.typeSelected.push(data)
}
console.log(this.typeSelected);
}

//select modality
selectJobModality(data:any):void{
  console.log(data);
var num=0;
for(let i=0;i<this.modalitySelected.length;i++){
  if(data==this.modalitySelected[i]){
   delete this.modalitySelected[i];
   num++;
  }
}
if(num==0){
  this.modalitySelected.push(data)
}
console.log(this.modalitySelected);
}

//select vacancy by comapany
onClickCompany(data:any):void{
console.log(data)
this.allVacancyData=[];

for(let i=0;i<this.vacancyData.length;i++){

  if(data==this.vacancyData[i].company.id){
    this.allVacancyData.push(this.vacancyData[i])
  }
}
console.log(this.allVacancyData)
}

  }


