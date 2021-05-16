import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(
    private snackbar: MatSnackBar
  ) {}

  showSnackBar(message: string, duration: number = 2000) {
    this.snackbar.open(message, '', {
      duration
    });
  }
}
