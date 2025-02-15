import { Component } from '@angular/core';
import { UserNavComponent } from '../../../shared/components/user-nav/user-nav.component';
import { FooterComponent } from '../../../shared/components/user/footer/footer.component';
import { UserScndNavComponent } from "../../../shared/components/user-scnd-nav/user-scnd-nav.component";

@Component({
  selector: 'app-user-profile',
  standalone:true,
  imports: [FooterComponent, UserScndNavComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}
