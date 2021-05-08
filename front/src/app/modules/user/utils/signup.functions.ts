import { AbstractControl, FormGroup } from '@angular/forms';

export const passwordsValidator = (form: FormGroup) => {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!form) return null;

    const password1 = form.get('password1').value;
    const password2 = control.value;

    return password1 !== password2
      ? { invalidMatch: true }
      : null;
  };
}
