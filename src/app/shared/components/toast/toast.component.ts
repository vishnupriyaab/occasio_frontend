import { Component, OnInit } from '@angular/core';
import IToastOption from '../../../core/models/IToastOptions';
import { ToastService } from '../../../core/services/toaster/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent implements OnInit {
  toast: IToastOption | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    console.log('Toast component initialized');
    this.toastService.toastOption$.subscribe((toast) => {
      console.log('Received toast:', toast);
      this.toast = toast;
      setTimeout(() => {
        console.log('Clearing toast');
        this.toast = null;
      }, 3000);
    });
  }
}
