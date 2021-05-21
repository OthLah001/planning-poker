import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'logout',
  template: ``
})
export class LogoutComponent implements OnInit, OnDestroy {

  private subs: Subscription = new Subscription();

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subs.add(
      this.firebaseService
        .logOutCurrentUser()
        .subscribe(
          response => this.router.navigateByUrl('/user/login')
        )
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
