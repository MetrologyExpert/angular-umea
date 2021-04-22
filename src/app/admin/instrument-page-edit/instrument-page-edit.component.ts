import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { InstrumentService } from 'src/app/instrument.service';
import { UncertaintyService } from 'src/app/uncertainty.service';

@Component({
  selector: 'app-instrument-page-edit',
  templateUrl: './instrument-page-edit.component.html',
  styleUrls: ['./instrument-page-edit.component.css']
})
export class InstrumentPageEditComponent implements OnInit {
  
  instrumentProfile:FormGroup;
  val: number ;
  instrument = <any>{ };  
  instrumentId;
  arr:any[];

  selectedValue;

  // contributionsValueChanges$;
  contributionsArray = [];
  stdUnc=[];


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

     if (this.instrumentId) this.instrumentService.getInstrument(this.instrumentId).valueChanges().subscribe( instrument => {
       this.instrument = instrument;

       console.log(this.instrumentProfile.get('uncertaintyTable'));

       for (let i = 0; i < instrument['uncertaintyTable'].length ; i++) {
        console.log ("Block statement execution no." + i);
      }


        for (let u of instrument['uncertaintyTable'])
        { 
          console.log(u.case);
           this.contributionsArray = [];
           let i =0;
            for (let c of u.contributions){
              let stdUnc_after = (c.stdUnc_before*c.sc)
              this.contributionsArray.push(this.fb.group({
                title: c.title,
                estimate: c.estimate,
                pdf: c.pdf,
                stdUnc_before:(c.estimate/c.pdf),
                sc:c.sc,
                stdUnc_after: stdUnc_after,
                stdUnc_pow: Math.pow(c.stdUnc_after,2)
              }));
              console.log(this.stdUnc);
           }

            //u log
        (this.instrumentProfile.get('uncertaintyTable')as FormArray).push(this.fb.group({
          case: ['',[Validators.required]],
          contributions: this.fb.array(this.contributionsArray)
        })
        );
        }

       
        
         
      // (this.instrumentProfile.get('uncertaintyTable')as FormArray).push(this.fb.group({
      //     case: ["",[Validators.required]],
      //     contributions: this.fb.array([this.contributions, this.contributions])
      //   })
      //   );

      // (this.instrumentProfile.get('uncertaintyTable')as FormArray).push(this.fb.group({
      //   case: ["",[Validators.required]],
      //   contributions: this.fb.array([this.contributions, this.contributions])
      // })
      // );


      }

       );  
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
  
  }

      get uncertaintyTable(): FormGroup {
        return this.fb.group({
          case: ["",[Validators.required]],
          contributions: this.fb.array([this.contributions])
        });
      }

      get contributions(): FormGroup {
        return this.fb.group({
          title: '',
          estimate: '',
          pdf: '',
          stdUnc_before:'',
          sc:'',
          stdUnc_after: '',
          stdUnc_pow: ''
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
