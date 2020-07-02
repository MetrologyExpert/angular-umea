import { Observable } from 'rxjs';
import { InstrumentService } from './../../instrument.service';
import { UncertaintyService } from './../../uncertainty.service';
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take, map } from 'rxjs/operators'


@Component({
  selector: 'uncertainty-page',
  templateUrl: './uncertainty-page.component.html',
  styleUrls: ['./uncertainty-page.component.css']
})
export class UncertaintyPageComponent  {
  uncertainty = <any>{ };
  uncertainty$: Observable<any> ;
  selectedNumber;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private uncertaintyService: UncertaintyService) {

      this.uncertainty$ = this.uncertaintyService.getAll().snapshotChanges().pipe(
        map(changes => 
          changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal()}))
        )
      );

    
    }

    addUncertainty(uncertainty){
      return this.uncertaintyService.create(uncertainty);
      console.log(uncertainty);
    }

    addIdNumber(){
      return this.uncertaintyService.addIdNumber();
    }

    contribution(){
     // return this.uncertaintyService.contribution();
    }


    selected(n){
      this.selectedNumber = n;
     return console.log(n);
    }

}
