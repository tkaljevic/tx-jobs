import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private snackBar = inject(MatSnackBar);

  showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', { panelClass: 'success-snackbar' });
  }

  showWarning(message: string): void {
    this.snackBar.open(message, 'OK', { panelClass: 'warning-snackbar' });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'OK', { panelClass: 'error-snackbar' });
  }
}
