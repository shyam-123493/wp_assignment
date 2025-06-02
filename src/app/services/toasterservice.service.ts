import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterserviceService {
  private toastSubject = new BehaviorSubject<{ message: string, type: 'success' | 'error' } | null>(null);
  toastState$ = this.toastSubject.asObservable();

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastSubject.next({ message, type });

    // Auto-clear after 2 seconds
    setTimeout(() => {
      this.toastSubject.next(null);
    }, 2000);
  }
}
