import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  imports: [],
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css'
})
export class AdminNavComponent {
  private route = inject(ActivatedRoute)
  @Input() Pagename: string = '';
  // constructor(){
  //   this.route.data.subscribe((data) => {
  //     this.heading = data['heading'];
  //     console.log(data,"1234567890-");
  //     console.log(this.route.parent,"0987654");
      
  //   });
  // }
}
