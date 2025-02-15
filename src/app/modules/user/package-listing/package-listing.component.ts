import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserScndNavComponent } from "../../../shared/components/user-scnd-nav/user-scnd-nav.component";
import { FooterComponent } from "../../../shared/components/user/footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-package-listing',
  imports: [UserScndNavComponent, FooterComponent, CommonModule],
  standalone: true,
  templateUrl: './package-listing.component.html',
  styleUrl: './package-listing.component.css',
})
export class PackageListingComponent implements OnInit {
  eventId: string = '';
  constructor( private route:ActivatedRoute ){}

  ngOnInit(): void {
    console.log('1234567890');
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.eventId = id;
      }
    });
  }

  fetchPackage(){
    
  }

  viewdetails(){

  }

}
