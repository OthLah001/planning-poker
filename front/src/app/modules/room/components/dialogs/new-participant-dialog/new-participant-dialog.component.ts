import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'new-participant-dialog',
  template: `
    <div>
      <h1>Please provide your display name</h1>
      <form>
        <mat-form-field appearance="standard">
          <mat-label>Display name</mat-label>
          <input
            type="text"
            matInput
            required
            placeholder="name..."
            [formControl]="displayNameFC"
          />
          <mat-error
            *ngIf="
              displayNameFC.hasError('required') && displayNameFC.touched
            "
          >
            This field is required
          </mat-error>
        </mat-form-field>
      </form>

      <div>
        <button mat-flat-button color="primary" (click)="submit()">Join</button>
      </div>
    </div>
  `,
})
export class NewParticipantDialogComponent {
  public displayNameFC: FormControl = new FormControl(null, Validators.required);

  constructor(
    public dialogRef: MatDialogRef<NewParticipantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  submit() {
    if (this.displayNameFC.invalid) {
      this.displayNameFC.markAsTouched();
      return;
    }

    this.dialogRef.close(this.displayNameFC.value);
  }
}
