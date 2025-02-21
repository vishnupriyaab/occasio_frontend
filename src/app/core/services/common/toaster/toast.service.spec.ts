import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import IToastOption from '../../../models/IToastOptions';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<IToastOption | null>(null);

  toast$ = this.toastSubject.asObservable();

  showToast(toast: IToastOption) {
    this.toastSubject.next(toast);
    setTimeout(() => {
      this.toastSubject.next(null);
    }, 3000); // Toast message disappears after 3 seconds
  }
}
