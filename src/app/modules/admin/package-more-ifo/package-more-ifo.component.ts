import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-package-more-ifo',
  imports: [],
  templateUrl: './package-more-ifo.component.html',
  styleUrl: './package-more-ifo.component.css'
})
export class PackageMoreIfoComponent implements OnInit{
  packageId: string | null = null;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the package ID from the route parameter
    this.route.params.subscribe(params => {
      this.packageId = params['id'];
      console.log('Package ID:', this.packageId);
    });
  }
}
