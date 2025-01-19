import { Component, OnInit } from '@angular/core';
import { EventServiceService } from '../../../core/services/event-management/event-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-listing',
  imports: [CommonModule],
  templateUrl: './event-listing.component.html',
  styleUrl: './event-listing.component.css'
})
export class EventListingComponent implements OnInit{
  events: any[] = [];
  constructor(private eventAuthService: EventServiceService){}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    // this.isLoading = true;
    this.eventAuthService.getEvents().subscribe(
      (response) => {
        console.log(response,"dertyuio");
        this.events = response.data;
        console.log(this.events,"wertyuixcvbnm,");
        // this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching events:', error);
        // this.isLoading = false;
      }
    );
  }
}
