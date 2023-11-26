import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Eventschedule } from 'src/app/app/classes/eventschedule';
import { Monthly } from 'src/app/app/classes/monthly';
import { EventsService } from 'src/app/app/services/events.service';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css']
})
export class MonthlyComponent implements OnInit {
  eventm: Monthly[] = [];
  eventschedule: Eventschedule[] = [];
  searchtext: string = '';

  constructor(private eventservice: EventsService, private router: Router) {}

  ngOnInit(): void {
    this.eventservice.getEventsM().subscribe(
      data => {
        this.eventm = data;
      }
    );
    this.eventservice.getTableau().subscribe(
      datatab => {
        this.eventschedule = datatab;
      }
    );
  }
/*pour affichage des details  */
  toggleDetails(event: Monthly): void {
    event.showDetails = !event.showDetails;
  }

  //pour la  barre de recherche des événements mensuel 
  searmonthlyevents() {
  
    //filtrer les événements selon  l'id ou le  nom
        this.eventservice.getEventsM().subscribe((data) => {
          const searchTextLower = this.searchtext.toLowerCase();
      
          this.eventm = data.filter(
            (event) =>
              event.id.toString().includes(searchTextLower) ||
              event.nom.toLowerCase().includes(searchTextLower)
          );
        });
      }
}