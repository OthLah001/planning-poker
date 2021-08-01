import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'leave-room-dialog',
  template: `
    <div>
      <p mat-dialog-title>Do you wanna really leave this room?</p>

      <div>
        <button mat-flat-button color="primary" [mat-dialog-close]="false">Cancel</button>
        <button mat-flat-button color="primary" [mat-dialog-close]="true">Leave</button>
      </div>
    </div>
  `,
})
export class LeaveRoomDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LeaveRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}
}
