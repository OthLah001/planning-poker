import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { emailPattern } from 'src/app/modules/user/utils/user.patterns';
import { FirebaseService } from "src/app/services/firebase.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styles: [`
        .input-icon {
          cursor: pointer;
        }
    `]
})

export class LoginComponent implements OnInit {

  public form: FormGroup
  public hidePassword: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: [null, {
        validators: [Validators.required, Validators.pattern(emailPattern)]
      }],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  showHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  submit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.firebaseService.SignIn(email, password)
      .then(userCredential => {
        // TODO: userCredential.user
      })
  }
}