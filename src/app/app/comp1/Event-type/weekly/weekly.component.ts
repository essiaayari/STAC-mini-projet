import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Eventschedule } from 'src/app/app/classes/eventschedule';
import { Weekly } from 'src/app/app/classes/weekly';
import { EventsService } from 'src/app/app/services/events.service';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css']
})


export class WeeklyComponent implements OnInit {
  eventw: Weekly[] = [];
  eventschedule: Eventschedule[] = [];
  visible:boolean=false;
  searchtext: string = '';//pour la barre de recherche

  constructor(private eventservice: EventsService, private router: Router) {}

  ngOnInit(): void {
    this.eventservice.getEventsW().subscribe(
      data => {
        this.eventw = data;
      }
    );
    this.eventservice.getTableau().subscribe(
      datatab => {
        this.eventschedule = datatab;
      }
    );
  }
  // pour l'affichage des détails
  toggleDetails(event: Weekly): void {
    event.showDetails = !event.showDetails;
  }


//pour la barre de recherche  
  searchweeklyevents() {
    //filtrer les événements selon l'id ou le nom
        this.eventservice.getEventsW().subscribe((data) => {
          const searchTextLower = this.searchtext.toLowerCase();
      
          this.eventw = data.filter(
            (event) =>
              event.id.toString().includes(searchTextLower) ||
              event.nom.toLowerCase().includes(searchTextLower)
          );
        });
      }

}