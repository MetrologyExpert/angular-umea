import { UncertaintyService } from './../../uncertainty.service';
import { InstrumentService } from './../../instrument.service';
import { CategoryService } from './../../category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';


import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';

import * as firebase from 'firebase/app';

import { Component, OnInit } from '@angular/core';
import { max } from 'rxjs/operators';

@Component({
  selector: 'instrument-page',
  templateUrl: './instrument-page.component.html',
  styleUrls: ['./instrument-page.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class InstrumentPageComponent  {

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['italic'],
      ['fontSize']
    ]
};

  instrumentProfile:FormGroup;
  val: number ;
  instrument = <any>{ };  
  instrumentId;
  arr:any[];

  selectedValue;
  stdUnc = [];


  // contributionsValueChanges$;
  contributionsArray = [];
  imagePathsArray = [];
  image;
  imageName=[];
 
  totalStdUnc:number;
  total:number;
  instrumentSubscribe$
  myFormValueChanges$;


  constructor (
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

    private instrumentService: InstrumentService,
    config: NgbModalConfig, private modalService: NgbModal
    ) { 

      //modal dialog for the image
      config.backdrop = 'static';
      config.keyboard = false;
 

      this.instrumentId = this.route.snapshot.paramMap.get('id'); 
      // console.log(this.instrumentServi(ce.getUncertainty(this.instrumentId,0))

     if (this.instrumentId) this.instrumentSubscribe$;
     
     this.instrumentSubscribe$ = this.instrumentService.getInstrument(this.instrumentId).valueChanges().subscribe( instrument => {
       this.instrument = instrument;

        for (let u of instrument['uncertaintyTable'])
        {        
          this.total = 0;

           this.contributionsArray = [];
           this.imagePathsArray = [];

           let j = 0;
           for (let x of u.imagePaths){
             j++;
              this.imagePathsArray.push(this.imagePaths);
            }  
           let i=0;
           
           for (let c of u.contributions){
              i++;
              this.contributionsArray.push(this.contributions);
            }
            //u log
        (this.instrumentProfile.get('uncertaintyTable')as FormArray).push(this.fb.group({
          case: ['',[Validators.required]],
          imagePaths: this.fb.array(this.imagePathsArray),
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
          imagePaths:this.fb.array([this.imagePaths]),
          contributions: this.fb.array([this.contributions]),
        });
      }

      get imagePaths():FormGroup{
        return this.fb.group({
          imagePath:'',
          imageName:''
        })
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

      addImagePaths(imgs){
        imgs.get(this.imagePaths).push(this.imagePaths);
      }
    
      addContribution(unc) {
        unc.get("contributions").push(this.contributions);
      }

      private updateTotalUncertainty(uncertaintyTab:any){

        let j=0;
       
        // const control = (<FormArray>this.instrumentProfile.get('uncertaintyTable')).value[j];
      
        // console.log( uncertaintyTab);
        for (let u of uncertaintyTab){
          this.image = [];

        // console.log(control);
          // let control = ((((this.instrumentProfile.get('uncertaintyTable') as FormArray).controls[j].get('contributions') as FormGroup)).controls[0] as FormGroup).controls['stdUnc_before'].dirty;
          // const control = (<FormArray>this.instrumentProfile.get('uncertaintyTable')).value[j]['contributions'];
          // let control = (<FormArray>this.instrumentProfile.get('uncertaintyTable')).value[j];

          let controlArray = ((this.instrumentProfile.get('uncertaintyTable') as FormArray).controls[j]);
          j++;
          this.total = 0;

          let o = 0;
          
           for(let x in u.imagePaths){
            o++;
            this.image;

            let controlImage = (((controlArray.get('imagePaths') as FormGroup)).controls[x] as FormGroup);
            let imageForm = controlImage.controls['imagePath'].value;
            let imageNameForm = controlImage.controls['imageName'].value;
               this.image.push(imageForm);
               this.imageName.push(imageNameForm);
           }
          
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

            // console.log(k + '=' +u.contributions.length);

            this.stdUnc.push(Math.sqrt(this.total));
            // console.log(this.stdUnc);
          }
        }
        }
        // this.image = ["https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png", 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGa7-Z0rQuGMydGrzjngi2438rbeTmdGuaxjGkHUVa24i42Q1eVV6oBWmXl9gYtsNLsC8&usqp=CAU'];

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

      open(content) {
        this.modalService.open(content);
      }
    

      addImage(unc){
        return unc.get("imagePaths").push(this.imagePaths);
      }

      deleteImage(unc, index) {
        unc.get("imagePaths").removeAt(index);
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