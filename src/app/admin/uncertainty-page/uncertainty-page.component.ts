import { CategoryService } from './../../category.service';
import { Observable } from 'rxjs';
import { InstrumentService } from './../../instrument.service';
import { UncertaintyService } from './../../uncertainty.service';
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, toArray, filter, take } from 'rxjs/operators';
import { of } from 'rxjs';

import { Uncertainty } from 'src/app/model/uncertainty';


@Component({
  selector: 'uncertainty-page',
  templateUrl: './uncertainty-page.component.html',
  styleUrls: ['./uncertainty-page.component.css']
})
export class UncertaintyPageComponent  {
 
   instrument = <any>{ };
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
   } 

}
