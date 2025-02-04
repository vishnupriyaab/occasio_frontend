import { Component } from '@angular/core';
import { UserNavComponent } from '../../../shared/components/user-nav/user-nav.component';
import { FooterComponent } from '../../../shared/components/user/footer/footer.component';

@Component({
  selector: 'app-user-profile',
  standalone:true,
  imports: [UserNavComponent, FooterComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}
