import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'edit-password',
  templateUrl: './edit-password.component.html',
  styles: [`
    .input-icon {
      cursor: pointer;
    }
  `]
})
export class EditPasswordComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public dataLoaded: boolean = false;
  public hidePassword: boolean = true;

  private email: string = '';
  private subs: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private generalService: GeneralService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subs.add(
      this.firebaseService
        .getAuthState()
        .subscribe(user => {
          if (!user) {
            this.router.navigateByUrl('/user/login');
            return;
          }

          this.email = user.email;
          this.initForm();
        })
    );
  }

  initForm() {
    this.form = this.fb.group({
      oldPassword: [null, [Validators.required, Validators.minLength(8)]],
      newPassword1: [null, [Validators.required, Validators.minLength(8)]],
      newPassword2: [null, [Validators.required, Validators.minLength(8)]]
    });

    this.subs.add(
      combineLatest([
        this.form.get('newPassword1').valueChanges,
        this.form.get('newPassword2').valueChanges
      ]).subscribe(([newPassword1, newPassword2]) => {
        let errors = this.form.get('newPassword2').errors;
  
        if (newPassword1 !== newPassword2)  errors = Object.assign(errors ?? {}, { invalidMatch: true })
        else  delete errors?.invalidMatch
  
        this.form.get('newPassword2').setErrors(errors && Object.keys(errors).length > 0 ? errors : null);
      })
    );

    this.dataLoaded = true;
  }

  showHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;
    this.subs.add(
      this.firebaseService.reSignInWithCredential(
        this.firebaseService.getNewCredentialsByEmailAndPassword(this.email, data.oldPassword)
      ).subscribe(
        response => this.editPassword(data.newPassword1),
        error => this.generalService.showSnackBar('Cannot change your password.')
      )
    );
  }

  editPassword(password) {
    this.subs.add(
      this.firebaseService.editCurrentUserPassword(password)
        .subscribe(
          response => this.generalService.showSnackBar('Password changed correctly.'),
          error => this.generalService.showSnackBar('Cannot change your password.')
        )
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
