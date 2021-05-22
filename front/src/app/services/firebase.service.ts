import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  DocumentReference,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import firebase from 'firebase/app';

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

  checkIfUserConnected(): Observable<boolean> {
    return from(
      this.auth.currentUser.then(
        user => !!user
      )
    );
  }

  signUp(email: string, password: string): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(email, password));
  }

  updateCurrentUserProfile(displayName: string): Observable<any> {
    return from(
      this.auth.currentUser.then(
        user => user.updateProfile({ displayName })
      )
    );
  }

  sendVerificationEmailToCurrentUser(): Observable<any> {
    return from(
      this.auth.currentUser.then(
        user => user.sendEmailVerification()
      )
    );
  }

  getCurrentUserInfo(): Observable<any> {
    return from(
      this.auth.currentUser.then(
        user => {
          return {
            email: user.email,
            displayName: user.displayName
          }
        }
      )
    );
  }

  getNewCredentialsByEmailAndPassword(email, password): firebase.auth.AuthCredential {
    return firebase.auth.EmailAuthProvider.credential(email, password);
  }

  reSignInWithCredential(credential: firebase.auth.AuthCredential): Observable<any> {
    return from(
      this.auth.currentUser.then(
        user => user.reauthenticateWithCredential(credential)
      )
    );
  }

  editCurrentUserPassword(password): Observable<any> {
    return from(
      this.auth.currentUser.then(
        user => user.updatePassword(password)
      )
    );
  }

  verifyEmailwithCode(code: string): Observable<any> {
    return from(
      this.auth.applyActionCode(code)
    );
  }

  sendResetPasswordEmail(email: string): Observable<any> {
    return from(
      this.auth.sendPasswordResetEmail(email)
    )
  }

  resetPassword(code: string, password: string): Observable<any> {
    return from(
      this.auth.confirmPasswordReset(code, password)
    );
  }

  logOutCurrentUser(): Observable<any> {
    return from(this.auth.signOut());
  }
}
