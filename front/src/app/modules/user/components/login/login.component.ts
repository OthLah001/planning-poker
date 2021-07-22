import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { emailPattern } from 'src/app/modules/user/utils/user.patterns';

@Component({
  selector: 'login',
  templateUrl: `./login.component.html`,
  styles: [`
    .input-icon {
      cursor: pointer;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public dataLoaded: boolean = false;
  public hidePassword: boolean = true;

  public hasLoginInError: boolean = false;

  private subs: Subscription = new Subscription();

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, {
        validators: [Validators.required, Validators.pattern(emailPattern)],
        updateOn: 'change'
      }],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });

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

    const user = this.form.value;
    this.subs.add(
      this.firebaseService.login(user.email, user.password).subscribe(
        user => this.router.navigateByUrl('/user/settings'), // TO-DO: go to dashboard,
        error => this.hasLoginInError = true
      )
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
