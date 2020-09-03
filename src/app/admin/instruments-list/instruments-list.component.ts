import { Observable } from 'rxjs';
import { InstrumentService } from './../../instrument.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators'

@Component({
  selector: 'instruments-list',
  templateUrl: './instruments-list.component.html',
  styleUrls: ['./instruments-list.component.css']
})
export class InstrumentsListComponent  {
instruments$: Observable<any>;


  constructor(
    private instrumentService:InstrumentService
  ) {
    this.instruments$ = this.instrumentService.getAll()
    .snapshotChanges()
    .pipe(
      map(changes => 
      changes.map(c => ({ key: c.payload.key, ...c.payload.child("instrument_details").exportVal()}))
      )
    );
   }

   

}
