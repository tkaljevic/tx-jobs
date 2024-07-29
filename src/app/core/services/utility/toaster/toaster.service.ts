import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private snackBar = inject(MatSnackBar);

  showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', { panelClass: 'success-snackbar' });
    this.hideMessage();
  }

  showWarning(message: string): void {
    this.snackBar.open(message, 'OK', { panelClass: 'warning-snackbar' });
    this.hideMessage();
  }

  showError(message: string): void {
    this.snackBar.open(message, 'OK', { panelClass: 'error-snackbar' });
    this.hideMessage();
  }

  private hideMessage(): void {
    setTimeout(() => {
      this.snackBar._openedSnackBarRef?.dismiss();
    }, 3_000);
  }
}
