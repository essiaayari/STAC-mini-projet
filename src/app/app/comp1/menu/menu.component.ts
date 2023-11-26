import { AfterViewInit, Component, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit {
  searchtext: string = '';

  constructor(private renderer: Renderer2) {
    
  }

  ngAfterViewInit() {
    const minim = document.querySelector(".minimenu") as HTMLElement;
    const navLinks = document.querySelector(".links") as HTMLElement;

    minim.addEventListener('click', () => {
      this.renderer.addClass(navLinks, 'mobile-menu');
    });
  }

  //fonction pour que la navbar soit en prmier lieu transparante et lors de défillement vers le bas le background se change en noir
  @HostListener('window:scroll', ['$event'])//est un décorateur en Angular utilisé pour écouter des événements sur l'élément hôte pour le dom
  onScroll(event: Event): void {
    const navbar = document.querySelector(".navbar") as HTMLElement;
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
      this.renderer.setStyle(navbar, 'backgroundColor', 'black'); 
    } else {
      this.renderer.setStyle(navbar, 'backgroundColor', 'transparent'); 
    }
  }

  

  

}
