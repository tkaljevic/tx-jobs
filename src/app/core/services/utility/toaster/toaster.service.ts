import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  showSuccess(message: string): void {
    alert(message);
  }

  showWarning(message: string): void {
    alert(message);
  }

  showError(message: string): void {
    alert(message);
  }
}
