import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, distinct} from 'rxjs/operators'
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UncertaintyService {
uncertainty: any;
count: number = 0;



  constructor(private db: AngularFireDatabase,
   ) { }

  getProduct(productId) {
    return this.db.object('/instruments/' + productId);
  }

  create(product) {
    return this.db.list('/products/').push(product);
  }
     
  updateProduct(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }

  getAll() {
    return this.db.list<any>('/products').snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({ key: a.key, ...a.payload.val() }))
        )
      );
  }

}
