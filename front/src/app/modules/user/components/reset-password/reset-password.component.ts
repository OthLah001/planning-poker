import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { emailPattern } from 'src/app/modules/user/utils/user.patterns';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styles: [`
    .input-icon {
      cursor: pointer;
    }
  `]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  public dataLoaded: boolean = false;
  public form: FormGroup = new FormGroup({});
  public hidePassword: boolean = true;

  public requestForSendingEmail: boolean = false;
  public requestForSendingEmailSuccess: boolean = false;

  public requestForSettingPassword: boolean = false;
  public requestForSettingPasswordSuccess: boolean = false;

  private subs: Subscription = new Subscription();
  private oobCode: string = null;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    this.oobCode = this.activatedRoute.snapshot.queryParamMap.get('oobCode');

    if (this.oobCode) { // setting new password
      this.form.addControl('password1', new FormControl(null, [Validators.required, Validators.minLength(8)]));
      this.form.addControl('password2', new FormControl(null, [Validators.required, Validators.minLength(8)]));

      this.subs.add(
        combineLatest([
          this.form.get('password1').valueChanges,
          this.form.get('password2').valueChanges
        ]).subscribe(([password1, password2]) => {
          let errors = this.form.get('password2').errors;
    
          if (password1 !== password2)  errors = Object.assign(errors ?? {}, { invalidMatch: true })
          else  delete errors?.invalidMatch
    
          this.form.get('password2').setErrors(errors && Object.keys(errors).length > 0 ? errors : null);
        })
      );

      this.requestForSettingPassword = true;
    } else { // sending rest email
      this.form.addControl('email', new FormControl(null, [Validators.required, Validators.pattern(emailPattern)]));
      this.requestForSendingEmail = true;
    }

    this.dataLoaded = true;
  }

  showHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  sendResetEmail() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email } = this.form.value;
    this.subs.add(
      this.firebaseService
        .sendResetPasswordEmail(email)
        .subscribe(
          response => this.requestForSendingEmailSuccess = true,
          error => this.form.get('email').setErrors({ other: true })
        )
    );
  }

  resetPassword() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { password1 } = this.form.value;
    this.subs.add(
      this.firebaseService
        .resetPassword(this.oobCode, password1)
        .subscribe(
          response => this.requestForSettingPasswordSuccess = true,
          error => this.generalService.showSnackBar('Cannot reset your password')
        )
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
