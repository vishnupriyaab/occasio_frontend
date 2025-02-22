import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FoodFilters,
  SearchComponent,
} from '../../../shared/components/search/search/search.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { noAllSpacesValidator } from '../../../shared/validator/formValidator';
import { ToastService } from '../../../core/services/common/toaster/toast.service';
import IToastOption from '../../../core/models/IToastOptions';
// import { FoodServiceService } from '../../../core/services/food/food-service.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { FoodServiceService } from '../../../core/services/employees/foodService/food-service.service';

@Component({
  selector: 'app-food-management',
  imports: [
    SearchComponent,
    CommonModule,
    LoadingComponent,
    ReactiveFormsModule,
    PaginationComponent,
  ],
  templateUrl: './food-management.component.html',
  styleUrl: './food-management.component.css',
})
export class FoodManagementComponent implements OnInit {
  @ViewChild(SearchComponent) searchComponent!: SearchComponent;
  isModalOpen = false;
  isLoading = false;
  modalMode: 'add' | 'edit' = 'add';
  foodForm!: FormGroup;
  currentFilter: string = 'all';
  foods: any = [];
  filteredFoods: any[] = [];
  selectedFoodId:string = ''
  searchTerm: string = '';
  filters: FoodFilters = {
    status: 'all',
    price: 'all',
    category: 'all',
    session: 'all',
  };

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private foodAuthService: FoodServiceService
  ) {
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
  ngOnInit(): void {
    this.fetchFood();
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  fetchFood(): void {
    this.isLoading = true;
    this.foodAuthService
      .searchAndFilterFood(
        '',
        this.filters,
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (response) => {
          if (response.data.foods) {
            this.foods = response.data.foods;
            this.filteredFoods = [...this.foods];
          } else {
            this.foods = [];
            this.filteredFoods = [];
          }
          this.totalItems = response.data.totalFoods;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: 'Failed to fetch foods',
          };
          this.toastService.showToast(toastOption);
          this.isLoading = false;
        },
      });
  }

  editFood(food: any): void {
    this.modalMode = 'edit';
    this.isModalOpen = true;
    this.foodForm.patchValue({
      foodName: food.foodName,
      category: food.category,
      price: food.price,
      foodSection: food.foodSection,
      status: food.status,
    });
    this.selectedFoodId = food._id;
  }

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
      status: this.foodForm.get('status')?.value,
    };
    console.log('Form is valid, submitting:', foodData);

    if(this.modalMode === 'add'){
      this.foodAuthService.addFood(foodData).subscribe({
        next: (response) => {
          this.isLoading = true;
          console.log(response, 'response');
          if (response.statusCode === 200) {
            const toastOption: IToastOption = {
              severity: 'success-toast',
              summary: 'Success',
              detail: 'Food added successfully!',
            };
            this.toastService.showToast(toastOption);
            this.toggleModal();
          }
        },
        error: (error) => {
          console.log(error, 'error');
        },
      });
    }else{
      this.foodAuthService.updateFood(this.selectedFoodId, foodData).subscribe({
        next: (response) => {
          if (response.statusCode === 200) {
            this.toastService.showToast({
              severity: 'success-toast',
              summary: 'Success',
              detail: 'Food updated successfully!',
            });
            this.toggleModal();
            this.fetchFood(); // Refresh food list
          }
        },
        error: (error) => console.log(error),
      });
    }
  }

  onSearch(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredFoods = [...this.foods];
      this.totalItems = this.foods.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.currentPage = 1;
      return;
    }
    this.foodAuthService
      .searchAndFilterFood(
        searchTerm,
        this.filters,
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.filteredFoods = response.data.foods;
          this.totalItems = response.data.totalFoods;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          console.log('finished!!!');
        },
        error: (error) => {
          console.log(error);
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: 'Failed to search foods',
          };
          this.toastService.showToast(toastOption);
          this.isLoading = false;
        },
      });
  }

  onFilterChange(filters: any): void {
    this.filters = JSON.parse(filters);
    this.currentPage = 1;
    this.onSearch(this.searchComponent.searchTerm);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    if (this.searchComponent.searchTerm.trim()) {
      this.onSearch(this.searchComponent.searchTerm);
    } else if (
      this.filters.status !== 'all' ||
      this.filters.price !== 'all' ||
      this.filters.category !== 'all' ||
      this.filters.session !== 'all'
    ) {
      this.onFilterChange(JSON.stringify(this.filters));
    } else {
      this.fetchFood();
    }
  }

  hasError(controlName: string, errorName: string) {
    return this.foodForm.controls[controlName].hasError(errorName);
  }
}
