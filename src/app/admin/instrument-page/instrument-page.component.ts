import { UncertaintyService } from './../../uncertainty.service';
import { InstrumentService } from './../../instrument.service';
import { CategoryService } from './../../category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators'
import * as firebase from 'firebase/app';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'instrument-page',
  templateUrl: './instrument-page.component.html',
  styleUrls: ['./instrument-page.component.css']
})
export class InstrumentPageComponent  {


  instrumentProfile:FormGroup;
  val: number ;
  selectedDay: any = 1;
  instrument = <any>{ };  
  instrumentId;
  constructor (
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

    private categoryService: CategoryService,
    private instrumentService: InstrumentService,
    private uncertaintyService: UncertaintyService
    ) { 

      this.instrumentId = this.route.snapshot.paramMap.get('id'); 
      console.warn(this.instrumentId); 

     if (this.instrumentId) this.instrumentService.getInstrument(this.instrumentId).valueChanges().pipe(take(1)).subscribe(i => this.instrumentProfile.setValue(i));
      
    }

ngOnInit(){  
  this.instrumentProfile = this.fb.group({
  instrument_details: this.fb.group({
    name: ["", [Validators.required, Validators.minLength(6)]],
    manufacturer:["",[Validators.required]],
    model:["", [Validators.required]],
    description: ["",[Validators.required]]
  }),
  uncertaintyTable: this.fb.array([this.uncertaintyTable])
});

      }

      get uncertaintyTable(): FormGroup {
        return this.fb.group({
          case: ["",[Validators.required]],
          contributions: this.fb.array([this.contributions])
        });
      }

      get contributions(): FormGroup {
        return this.fb.group({
          title: "",
          estimate: "",
          divisor: [this.divisor], 
          stdunc_before:"",
          sc:"",
          stdunc_after:"",
          sqrtunc:""
        });
      }
  
      get divisor():number{
        return this.val;
      }

      // Getter for controls
      get name(){
        return this.instrumentProfile.controls.instrument_details.get('name');
      }

      addUncertainty() {
        (this.instrumentProfile.get("uncertaintyTable") as FormArray).push(this.uncertaintyTable);
      }
    
      deleteUncertainty(index) {
        (this.instrumentProfile.get("uncertaintyTable") as FormArray).removeAt(index);
      }
    
      addContribution(unc) {
        unc.get("contributions").push(this.contributions);
      }
    
      deleteContribution(unc, index) {
        unc.get("contributions").removeAt(index);
      }
    
      getPathUncertainty(){
        return (<FormArray>this.instrumentProfile.get('uncertaintyTable')).controls;
      }
 
     /*  selectChangeHandler (event: any) {
        //update the ui
        this.selectedDay = event.target.value;
      } */

       onKey (event: any) {
        //update the ui
        this.val = event.target.value;
      } 

      save() {
        if (this.instrumentId) { this.instrumentService.updateInstrument(this.instrumentId, this.instrumentProfile.value)}
        else
         {this.instrumentService.create(this.instrumentProfile.value)}; 
          this.router.navigate(['/admin/instruments-list']);

        console.warn(this.instrumentProfile.value);
        // if (this.instrumentId) { this.instrumentService.updateInstrument(this.instrumentId, instrument)}
        // else
        // {this.instrumentService.create(instrument)}; 
        // this.router.navigate(['/admin/instruments-list']);
       }

  /* instrument = <any>{ };
  categories$;
  instruments$;
  uncertainty = {title:"Temperature"};
  row = {row:"number 1"};
  instrumentId;
  

   constructor( 
    private router: Router,
    private route: ActivatedRoute,

    private categoryService: CategoryService,
    private instrumentService: InstrumentService,
    private uncertaintyService: UncertaintyService) { 
    
      //Fill up dropdown list
     this.categories$ = categoryService.getCategories();
      //add Id to Edit Page 
     this.instrumentId = this.route.snapshot.paramMap.get('id');  
     if (this.instrumentId) this.instrumentService.getInstrument(this.instrumentId).valueChanges().pipe(take(1)).subscribe(i => this.instrument = i);
     
     this.instruments$ = this.instrumentService.getAll().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal()}))));
      
    }
  

  save(instrument) {
    if (this.instrumentId) { this.instrumentService.updateInstrument(this.instrumentId, instrument)}
    else
     {this.instrumentService.create(instrument)}; 
      this.router.navigate(['/admin/instruments-list']);
   }

   delete() {
     if(confirm('Are you sure you want to delete this instrument?')){
      this.instrumentService.delete(this.instrumentId);
      this.router.navigate(['/admin/instruments-list']);
     }
   } */
}
