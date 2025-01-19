import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-package-more-info',
  standalone: true,
  imports: [],
  templateUrl: './package-more-info.component.html',
  styleUrl: './package-more-info.component.css',
})
export class PackageMoreInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the ID parameter from the route
    this.route.params.subscribe(params => {
      const id = params['id'];
      // Use the ID to fetch package details
      console.log('Package ID:', id);
    });
  }
}
