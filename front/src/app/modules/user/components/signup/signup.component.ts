import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styles: [`
    .input-icon {
      cursor: pointer;
    }
  `]
})
export class SignupComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public dataLoaded: boolean = false;

  public hidePassword: boolean = true;

  private subs: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // TO-DO: check if already logged in (cookies)

    this.form = this.formBuilder.group({
      email: [null, {
        validators: [Validators.required, Validators.pattern('[a-zA-Z0-9\.\-_]+@[a-z]+\.[a-z]{2,}')],
        updateOn: 'change'
      }],
      displayName: [null, Validators.required],
      password1: [null, [Validators.required, Validators.minLength(8)]],
      password2: [null, Validators.required]
    });

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

    this.dataLoaded = true;
  }

  showHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  submit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
