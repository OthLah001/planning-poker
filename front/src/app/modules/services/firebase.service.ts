import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFirestore) {}

  getCollection(collection: string): Observable<any> {
    return this.db.collection(collection).get();
  }

  getDocument(collection: string, document: string): Observable<any> {
    return this.db.collection(collection).doc(document).get();
  }

  setDocument(collection: string, model: any) {
    return this.db.collection(collection).add(model);
  }

  // add the rest of CRUD
}
