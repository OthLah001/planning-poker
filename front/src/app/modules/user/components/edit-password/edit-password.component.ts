import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';
import { emailPattern } from 'src/app/modules/user/utils/user.patterns';

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

  private subs: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
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

    console.log('VALID');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
