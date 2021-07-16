import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentService } from 'src/app/instrument.service';

@Component({
  selector: 'instrument-page-view',
  templateUrl: './instrument-page-view.component.html',
  styleUrls: ['./instrument-page-view.component.css']
})
export class InstrumentPageViewComponent implements OnInit {

  instrumentId;

  key;
  name;
  docNumber;
  tagArray = [];
  description;
  image = [];

  uncertaintyTable=[];
  total = 0;
  totalStdUnc = [];

  pdfText:{[key:number]:string}={
    1 : 'Normal - Std.Dev.',
    2 : 'Normal - Expanded',
    3 : 'Normal - Max.dev.',
    1.7320508 : 'Rectangular',
    2.4494 : 'Triangular'    
  }
  
  subscription$;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    
    private instrumentService: InstrumentService,
    ) { 

      this.instrumentId = this.route.snapshot.paramMap.get('id'); 

      this.subscription$ = this.instrumentService.getInstrument(this.instrumentId).valueChanges().subscribe( instrument => 
      {
        this.key = this.instrumentId;
        this.name = instrument['instrument_details'].name;
        this.docNumber = instrument['instrument_details'].docNumber;
        this.description = instrument['instrument_details'].description;
        this.tagArray = instrument['tags'];
        this.uncertaintyTable = instrument['uncertaintyTable'];

        for (let u of this.uncertaintyTable){
          let i = 0;
          this.total = 0;
          for (let c of u.contributions){
                this.total += (Math.pow(c.sc*(c.estimate/c.pdf),2));
                console.log(this.total);
          }
          this.totalStdUnc.push(Math.sqrt(this.total));
        }

        console.log(this.tagArray);
      });  




     } 

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscription$;
  }
}
