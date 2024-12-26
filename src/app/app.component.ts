import { Component } from '@angular/core';
// import { UserLoginComponent } from "./modules/user/user-login/user-login.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'occasio_frontend';
}
