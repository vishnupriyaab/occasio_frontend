import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/users/auth.service';
import { ToastService } from '../../../core/services/common/toaster/toast.service';
import IToastOption from '../../../core/models/IToastOptions';
import { UserNavComponent } from "../../../shared/components/user-nav/user-nav.component";
import { FooterComponent } from "../../../shared/components/user/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, UserNavComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Show button when scrolled down 300px
    this.showScrollButton = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
