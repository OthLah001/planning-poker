import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { emailPattern } from 'src/app/modules/user/utils/user.patterns';
import { FirebaseService } from 'src/app/services/firebase.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'personal-info',
  templateUrl: './personal-info.component.html'
})
export class PersonalInfoComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public dataLoaded: boolean = false;

  private subs: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    this.subs.add(
      this.firebaseService.getCurrentUserInfo().subscribe(info => this.initForm(info.email, info.displayName))
    );
  }

  initForm(email, displayName) {
    this.form = this.fb.group({
      email: [email, {
        validators: [Validators.required, Validators.pattern(emailPattern)],
        updateOn: 'change'
      }],
      displayName: [displayName, Validators.required]
    });

    this.dataLoaded = true;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.subs.add(
      this.firebaseService
        .updateCurrentUserProfile(this.form.value.displayName)
        .subscribe(
          response => this.generalService.showSnackBar('Display name has been modified successfully.'),
          error => this.generalService.showSnackBar('Cannot modify your display name.')
        )
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
