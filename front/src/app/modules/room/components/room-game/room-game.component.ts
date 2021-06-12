import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'room-game',
  templateUrl: './room-game.component.html'
})
export class RoomGameComponent implements OnInit, OnDestroy {

  private subs: Subscription = new Subscription();

  constructor(
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
