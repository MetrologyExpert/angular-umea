import { Observable } from 'rxjs';
import { InstrumentService } from './../../instrument.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'instruments-list',
  templateUrl: './instruments-list.component.html',
  styleUrls: ['./instruments-list.component.css']
})
export class InstrumentsListComponent  {
instruments$: Observable<any>;
ins;
instrumentId;
keyId = [];

ngOnInit(){
this.ins = this.instrumentService.getAll().valueChanges();
}


  constructor(
    private instrumentService:InstrumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.instrumentId = this.route.snapshot.paramMap.get('id'); 

    this.instruments$ = this.instrumentService.getAll().snapshotChanges()
    .pipe(
    map(changes => 
    changes.map(c => ({key: c.payload.key, ...c.payload.exportVal()}))));    
   }



    delete(key)
   { this.instrumentService.delete(key);}

}
