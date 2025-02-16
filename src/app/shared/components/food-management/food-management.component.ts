import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search/search.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { noAllSpacesValidator } from '../../validator/formValidator';
import { ToastService } from '../../../core/services/toaster/toast.service';
import IToastOption from '../../../core/models/IToastOptions';
import { FoodServiceService } from '../../../core/services/food/food-service.service';
import { response } from 'express';

@Component({
  selector: 'app-food-management',
  imports: [
    SearchComponent,
    CommonModule,
    LoadingComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './food-management.component.html',
  styleUrl: './food-management.component.css',
})
export class FoodManagementComponent implements OnInit {
  isModalOpen = false;
  isLoading = false;
  modalMode: 'add' | 'edit' = 'add';
  foodForm!: FormGroup;

  constructor(private fb: FormBuilder, private toastService: ToastService, private foodAuthService:FoodServiceService) {
    this.foodForm = this.fb.group({
      foodName: [
        '',
        [Validators.required, noAllSpacesValidator(), Validators.minLength(3)],
      ],
      category: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      foodSection: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}

  addFood(): void {
    if (!this.foodForm.valid) {
      console.log('12345678');
      Object.keys(this.foodForm.controls).forEach((key) => {
        const control = this.foodForm.get(key);
        control?.markAsTouched();
      });
      console.log('Form is invalid');
      const toastOption: IToastOption = {
        severity: 'danger-toast',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly',
      };
      this.toastService.showToast(toastOption);
      return;
    }
    console.log('food submited!');
    const foodData = {
      foodName: this.foodForm.get('foodName')?.value,
      category: this.foodForm.get('category')?.value,
      price: this.foodForm.get('price')?.value,
      foodSection: this.foodForm.get('foodSection')?.value,
      status: this.foodForm.get('status')?.value
    }

    console.log('Form is valid, submitting:', foodData);

    this.foodAuthService.addFood(foodData).subscribe({
      next:(response)=>{
        console.log(response,'response');
      },error:(error)=>{
        console.log(error,"error")
      }
    })

  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  hasError(controlName: string, errorName: string) {
    return this.foodForm.controls[controlName].hasError(errorName);
  }
}
