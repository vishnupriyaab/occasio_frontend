import { Component, inject, OnInit } from '@angular/core';
import { UserNavComponent } from '../../../shared/components/user-nav/user-nav.component';
import { FooterComponent } from '../../../shared/components/user/footer/footer.component';
import { EventServiceService } from '../../../core/services/event-management/event-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'

@Component({
  selector: 'app-services',
  imports: [UserNavComponent, FooterComponent, CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit{
  private eventService = inject(EventServiceService);
  private router = inject(Router)
  events:any[] = []

  ngOnInit(): void {
    this.loadEvents()
  }
  loadEvents(){
    this.eventService.getEvents().subscribe({
      next: (response)=>{
        console.log(response.data)
        this.events = response.data;
      },error:(error)=>{
        console.log(error);
      }
    })
  }
  showPackage(eventId:string){
    console.log(eventId,"qwertyuiop")
    console.log('Navigating to:', `/services/packages/${eventId}`);
    this.router.navigate(['services/packages', eventId]);
    console.log("0987654")
  }
}
