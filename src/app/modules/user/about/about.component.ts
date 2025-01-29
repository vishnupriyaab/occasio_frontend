import { Component } from '@angular/core';
import { UserNavComponent } from "../../../shared/components/user-nav/user-nav.component";
import { FooterComponent } from "../../../shared/components/user/footer/footer.component";

@Component({
  selector: 'app-about',
  imports: [UserNavComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
