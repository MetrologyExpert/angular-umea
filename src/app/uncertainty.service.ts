import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UncertaintyService {
uncertainty: any;
count: number = 0;



  constructor(private db: AngularFireDatabase,
   ) { 

  }


      clickCount(){
        return this.count++;
          }

          
      create(uncertainty){
      return this.db.list('/uncertainty/').push(uncertainty);
      }

      createRow(uncId:string){
        return this.db.object('/data'+ uncId);
         
      }

      getAll(){
      return  this.db.list('/uncertainty/');
      }
    
      getAllContributions(){
        return  this.db.list('/uncertainty/');

      }

    addIdNumber(){
      return this.db.list('/uncertainty/').push({
        dateCreated: new Date().getTime(),
        tableNumber: this.clickCount(), 
      });
    }

    getUncertaintyById(uncId: string) {
      return this.db.object('/uncertainty/' + uncId)
    }

}
