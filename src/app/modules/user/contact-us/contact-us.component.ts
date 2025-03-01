import { Component } from '@angular/core';
import { UserNavComponent } from "../../../shared/components/user-nav/user-nav.component";
import { FooterComponent } from "../../../shared/components/user/footer/footer.component";
import { UserScndNavComponent } from "../../../shared/components/user-scnd-nav/user-scnd-nav.component";

@Component({
  selector: 'app-contact-us',
  standalone:true,
  imports: [UserScndNavComponent, FooterComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

}
