import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
    // doc of firestore
    // https://firebase.google.com/docs/firestore
  }
}
