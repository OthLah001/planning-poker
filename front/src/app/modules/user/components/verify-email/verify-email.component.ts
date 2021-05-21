import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'verify-email',
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit, OnDestroy {

  public isVerified: boolean = false;
  public isError: boolean = false;
  public isResendLink: boolean = false;

  private subs: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    const oobCode = this.activatedRoute.snapshot.queryParamMap.get('oobCode');
    if (oobCode) {
      this.subs.add(
        this.firebaseService
          .verifyEmailwithCode(oobCode)
          .subscribe(
            response => this.setNgIfVariables(true, false, false),
            error => this.setNgIfVariables(false, true, false)
          )
      );
    } else {
      this.setNgIfVariables(false, true, false)
    }
  }

  checkConnectivityBeforeSendEmail() {
    this.subs.add(
      this.firebaseService
        .checkIfUserConnected()
        .subscribe(isConnected => {
          if (isConnected)  this.resendLink()
          else  this.router.navigateByUrl('/user/login');
        })
    );
  }

  resendLink() {
    this.subs.add(
      this.firebaseService
        .sendVerificationEmailToCurrentUser()
        .subscribe(
          response => this.setNgIfVariables(false, false, true)
        )
    );
  }

  setNgIfVariables(isVerified: boolean, isError: boolean, isResendLink: boolean) {
    this.isVerified = isVerified;
    this.isError = isError;
    this.isResendLink = isResendLink;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
