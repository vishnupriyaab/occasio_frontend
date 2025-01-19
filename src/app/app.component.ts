import { Component } from '@angular/core';
// import { UserLoginComponent } from "./modules/user/user-login/user-login.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'occasio_frontend';
}
