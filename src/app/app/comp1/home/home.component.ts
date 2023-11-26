import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Events } from '../../classes/events';
import { Eventschedule } from '../../classes/eventschedule';
import { EventsService } from '../../services/events.service';
import { Router } from '@angular/router';
import { Gallery } from '../../classes/gallery';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  lesimages: Eventschedule[] = [];
  lesimg: Gallery[] = [];
  event: Events[] = [];
  eventschuedule: Eventschedule[] = [];
  @ViewChild('myVideo') myVideo: ElementRef | undefined; //@viewChild :  est utilisée pour obtenir une référence à un élément du DOM ou à une directive dans le template d'un composant

  constructor(
    private elementRef: ElementRef,//est un service Angular qui représente une référence à l'élément hôte de la directive ou du composant, En d'autres termes, c'est une référence à l'élément DOM auquel le composant Angular est attaché
    private renderer: Renderer2,//Renderer2 est un service Angular qui fournit des méthodes pour manipuler le DOM de manière sécurisée, indépendante de la plateforme et qui respecte le modèle de sécurité d'Angular utilisé pour effectuer des opérations DOM dans les composants 
    private eventservice: EventsService,
    private router: Router,
    private membreservice:MembersService,
  ) {}
  //pour naviger vers le composant "about us"
  onAboutUs() {
    this.router.navigate(['/aboutus']);
  }

  ngAfterViewInit() {// utilisé  pour effectuer des actions et des manipulations qui dépendent de la structure du DOM générée par Angular après l'initialisation. 

    // code  JavaScript s'execute en chargement de la page pour le compteur 

    var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

    var x = setInterval(() => {
      var now = new Date().getTime();
      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const demoElement: HTMLElement | null = this.elementRef.nativeElement.querySelector("#demo");
      if (demoElement) {
        this.renderer.setProperty(demoElement, 'innerHTML', `${days}d ${hours}h ${minutes}m ${seconds}s`);
      }

      if (distance < 0) {
        clearInterval(x);
        if (demoElement) {
          this.renderer.setProperty(demoElement, 'innerHTML', "EXPIRED");
        }
      }
    }, 1000);
  }
  


  

  ngOnInit(): void {
    //Récupération des éevenement, du tableau et du gallery 
   

    this.eventservice.getTableau().subscribe(datatab => {
      this.eventschuedule = datatab;
    });
    this.membreservice.getgallery().subscribe(datag => {
      this.lesimg = datag;
    });

    //pour que la video ce déclanche lorsqu'on charge la page "home"
if (this.myVideo) {
  const video: HTMLVideoElement = this.myVideo.nativeElement;
  if (video.paused) {
    video.play().catch(error => {
      console.error('Autoplay prevented:', error);
    });
  }
}
  }


getEvents() {
  return this.event;
}




//pour le boutton "Explore!" :(lorsqu'on click sur le boutton, il nous dérige vers le tableau des événements au dessous de la page "home") 
scrollToTableau() {
  const tableauSection = document.getElementById('tableau');
  if (tableauSection) {
    tableauSection.scrollIntoView({ behavior: 'smooth' });
  }
}

}