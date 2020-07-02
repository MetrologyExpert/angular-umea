import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }

  getCategories(){
    const cat = this.db.list('/categories').snapshotChanges(); 
    return cat;
  }
}
