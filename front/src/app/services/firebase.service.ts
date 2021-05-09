import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  DocumentReference,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  /*
       FireStore documentation https://firebase.google.com/docs/firestore/query-data/get-data
    */

  getCollection(collection: string): Observable<QuerySnapshot<any>> {
    return this.db.collection(collection).get();
  }

  getCollectionWithCond(
    collection: string,
    cond: { field: string; op: any; value: any; }
  ): Observable<QuerySnapshot<any>> {
    return this.db
      .collection(collection, (ref) =>
        ref.where(cond.field, cond.op, cond.value)
      )
      .get();
  }

  getOrdredCollectionWithCond(
    collection: string,
    cond: { field: string; op: any; value: any; orderBy: string }
  ): Observable<QuerySnapshot<any>> {
    return this.db
      .collection(collection, (ref) =>
        ref.where(cond.field, cond.op, cond.value).orderBy(cond.orderBy)
      )
      .get();
  }

  getDocument(
    collection: string,
    document: string
  ): Observable<QueryDocumentSnapshot<any>> {
    return this.db.collection(collection).doc(document).get();
  }

  setDocument(collection: string, model: any): Promise<DocumentReference<any>> {
    return this.db.collection(collection).add(model);
  }

  async signUp(email: string, password: string) {
    return await this.auth.createUserWithEmailAndPassword(email, password);
  }
}