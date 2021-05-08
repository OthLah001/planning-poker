import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordsValidator } from 'src/app/modules/user/utils/signup.functions';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit{
  public form: FormGroup;
  public dataLoaded: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // TO-DO: check if already logged in (cookies)

    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      displayName: [null, Validators.required],
      password1: [null, Validators.required],
      password2: [null, [Validators.required, passwordsValidator(this.form)]]
    });

    this.dataLoaded = true;
  }
}
