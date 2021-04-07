import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { MapOperator } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  constructor(private db:AngularFireDatabase) { }
 instrument: any;
 uncertainty;
 
 id;

  create(instrument){
    return this.db.list('/instruments/').push(instrument); 

  }

  getAll(){
    return this.db.list('/instruments/');
  }



  getDetails(instrumentId){
    return this.db.list('/instruments/' + instrumentId).valueChanges();

  }

  getInstrument(instrumentId) {
    return this.db.object('/instruments/' + instrumentId);
  }

  getUncertainty(instrumentId, uncertaintyId) {
    return this.db.object('/instruments/' + instrumentId+'/uncertaintyTable/'+ uncertaintyId);
  }



  updateInstrument(instrumentId, instrument){
    return this.getInstrument(instrumentId).update(instrument);
  }

  delete(instrumentId){
    return this.db.object('/instruments/' + instrumentId).remove();
  }

  readInstrumentrData(id){
    // return this.db.object('address' + id);
    return this.db.object('/admin/instrument-page/' + id)

  }
 
}
