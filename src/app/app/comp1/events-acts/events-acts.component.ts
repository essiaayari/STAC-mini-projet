import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Eventschedule } from '../../classes/eventschedule';
import { Router } from '@angular/router';
import { Monthly } from '../../classes/monthly';
import { Weekly } from '../../classes/weekly';

@Component({
  selector: 'app-events-acts',
  templateUrl: './events-acts.component.html',
  styleUrls: ['./events-acts.component.css']
})

export class EventsActsComponent implements OnInit {
  eventm: Monthly[] = [];
  eventw: Weekly[] = [];
  eventschuedule: Eventschedule[] = [];


  constructor(private eventservice: EventsService, private router: Router) {}

  ngOnInit(): void {
    // pour les evenements mentsuel
    this.eventservice.getEventsM().subscribe(
      data => {
        this.eventm = data;
      }
    );
    //pour obtenir les evenements hebdomadaires
    this.eventservice.getEventsW().subscribe(
      dataw => {
        this.eventw = dataw;
      }
    );

    this.eventservice.getTableau().subscribe(
      datatab => {
        this.eventschuedule = datatab;
      }
    );
  }
  
//pour naviger
  onweekly() {
    this.router.navigate(['/eventsandacts/weeklyactivities']);
  }

  onmonthly() {
    this.router.navigate(['/eventsandacts/monthlyevents']);
  }

 
}