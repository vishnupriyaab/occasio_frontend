import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PackageManagementComponent } from '../package-management/package-management.component';
import { SearchComponent } from '../../../shared/components/search/search/search.component';

@Component({
  selector: 'app-event-management-admin',
  imports: [],
  templateUrl: './event-management-admin.component.html',
  styleUrl: './event-management-admin.component.css',
})
export class EventManagementAdminComponent implements OnInit, AfterViewInit {
  @ViewChild(SearchComponent)
  packageManager!: SearchComponent;
  constructor(
    private sample : PackageManagementComponent
  ){
    
  }
  
  ngAfterViewInit(): void {
    console.log(this.packageManager,"1234567890-")
  }

  ngOnInit(): void {
    console.log(this.sample, 'qwertyuiop[');
  }

  

}
