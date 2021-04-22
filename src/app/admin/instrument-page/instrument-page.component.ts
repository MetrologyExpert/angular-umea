import { UncertaintyService } from './../../uncertainty.service';
import { InstrumentService } from './../../instrument.service';
import { CategoryService } from './../../category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase/app';

import { Component, OnInit } from '@angular/core';
import { max } from 'rxjs/operators';

@Component({
  selector: 'instrument-page',
  templateUrl: './instrument-page.component.html',
  styleUrls: ['./instrument-page.component.css']
})
export class InstrumentPageComponent  {


  instrumentProfile:FormGroup;
  val: number ;
  instrument = <any>{ };  
  instrumentId;
  arr:any[];

  selectedValue;
  stdUnc = [];


  // contributionsValueChanges$;
  contributionsArray = [];
  totalStdUnc:number;
  total:number;
  instrumentSubscribe$
  myFormValueChanges$;


  constructor (
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

    private categoryService: CategoryService,
    private instrumentService: InstrumentService,
    private uncertaintyService: UncertaintyService
    ) { 

      this.instrumentId = this.route.snapshot.paramMap.get('id'); 
      // console.log(this.instrumentServi(ce.getUncertainty(this.instrumentId,0))

     if (this.instrumentId) this.instrumentSubscribe$;
     
     this.instrumentSubscribe$ = this.instrumentService.getInstrument(this.instrumentId).valueChanges().subscribe( instrument => {
       this.instrument = instrument;

        for (let u of instrument['uncertaintyTable'])
        {        
          this.total = 0;

           this.contributionsArray = [];

          let i=0;
            for (let c of u.contributions){
              i++;
              this.contributionsArray.push(this.contributions);
              
        }

       
            //u log
        (this.instrumentProfile.get('uncertaintyTable')as FormArray).push(this.fb.group({
          case: ['',[Validators.required]],
          contributions: this.fb.array(this.contributionsArray)
        }));
        }
        this.instrumentProfile.patchValue(instrument);
      });  
    } 

   

    //event handler for the select element's change event
    selectChangeHandler (event: any) {
      //update the ui
      this.selectedValue = event.target.value;
    }

ngOnInit(){  
  this.instrumentProfile = this.fb.group({
  instrument_details: this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    manufacturer:["",[Validators.required]],
    model:["", [Validators.required]],
    description: ["",[Validators.required]]
     }),
  uncertaintyTable: this.fb.array([])
    });

   // initialize stream on contributiona
   this.myFormValueChanges$ = (this.instrumentProfile.get('uncertaintyTable')).valueChanges;
   // subscribe to the stream so listen to changes on units
   this.myFormValueChanges$.subscribe(uncertaintyTab => {
    // uncertaintyTab.reset; 
    this.updateTotalUncertainty(uncertaintyTab)});

  }

      get uncertaintyTable(): FormGroup {
        return this.fb.group({
          case: ["",[Validators.required]],
          contributions: this.fb.array([this.contributions]),
        });
      }

      get contributions(): FormGroup {
        return this.fb.group({
          title: '',
          estimate: '',
          pdf: '',
          stdUnc_before:{value:'', disabled:true},
          sc:'',
          stdUnc_after:{value:'', disabled:true},
          stdUnc_pow:new FormControl({value:'', disabled:true}),
        });

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

      private updateTotalUncertainty(uncertaintyTab:any){

        let j=0;
        // const control = (<FormArray>this.instrumentProfile.get('uncertaintyTable')).value[j];

        // console.log( uncertaintyTab);
        for (let u of uncertaintyTab){
        // console.log(control);
          // let control = ((((this.instrumentProfile.get('uncertaintyTable') as FormArray).controls[j].get('contributions') as FormGroup)).controls[0] as FormGroup).controls['stdUnc_before'].dirty;
          // const control = (<FormArray>this.instrumentProfile.get('uncertaintyTable')).value[j]['contributions'];
          // let control = (<FormArray>this.instrumentProfile.get('uncertaintyTable')).value[j];

          let controlArray = ((this.instrumentProfile.get('uncertaintyTable') as FormArray).controls[j]);
          j++;
          this.total = 0;

          let k =0;
          for(let i in u.contributions){
            k++;
            let controlGroup = (((controlArray.get('contributions') as FormGroup)).controls[i] as FormGroup)
            let controlForm_stdUncB = controlGroup.controls['stdUnc_before'];
            let stdUnc = (u.contributions[i].estimate/u.contributions[i].pdf);
            controlForm_stdUncB.setValue(stdUnc,{onlySelf:true, emitEvent: false});

            let standardUncertainty_after = (stdUnc *u.contributions[i].sc);
            let controlForm_stdUncA = controlGroup.controls['stdUnc_after'];
            controlForm_stdUncA.setValue(standardUncertainty_after,{onlySelf:true, emitEvent: false});

            let stdUnc_pow = +Math.pow(standardUncertainty_after,2);
            let controlForm_stdUnc_power = controlGroup.controls['stdUnc_pow'];
            controlForm_stdUnc_power.setValue(stdUnc_pow,{onlySelf:true, emitEvent: false});  

            this.total += stdUnc_pow;
            
            // console.log(controlForm_stdUnc_power);

            //  if ( !isNaN(stdUnc_pow)){
            //     this.total += stdUnc_pow;
            //     if ( max())
            //       console.log('index:'+ (j+ ' , ' +i) + 'total:'+this.total  );
            //  }

            
    
          }

          this.stdUnc.length = j-1;


          if ( !isNaN(this.total)){

          if (k = u.contributions.length){

            console.log(k + '=' +u.contributions.length);

            this.stdUnc.push(Math.sqrt(this.total));
            console.log(this.stdUnc);
          }
        }
        }
      }

    
      deleteContribution(unc, index) {
        unc.get("contributions").removeAt(index);
      }
    
      uncertainty(){
        (<FormArray>this.instrumentProfile.get("uncertaintyTable"));

      }


      getPathUncertainty(){
        return (<FormArray>this.instrumentProfile.get('uncertaintyTable')).controls;
      }
 
      loadCase(patchVal:number) {
        this.fb.control(patchVal);
      }

      save() {
        if (this.instrumentId) { this.instrumentService.updateInstrument(this.instrumentId, this.instrumentProfile.value)}
        else
         {this.instrumentService.create(this.instrumentProfile.value)}; 
          this.router.navigate(['/admin/instruments-list']);
        console.warn(this.instrumentProfile.value);
       }

       onDestroy(){
        this.instrumentSubscribe$
        this.myFormValueChanges$;
      
       }
}