import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { emailPattern } from 'src/app/modules/user/utils/user.patterns';

@Component({
  selector: 'personal-info',
  templateUrl: './personal-info.component.html'
})
export class PersonalInfoComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public dataLoaded: boolean = false;

  private subs: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // TO-DO: get email and display name

    this.initForm('email@example.com', 'Scrum master');
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

    console.log('VALID');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
