import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private router:Router){}
  //naviger vers le haut de la page en cliquant sur le logo 
onhome(){
  const home = document.getElementById('home');
    if(home){
      home.scrollIntoView({ behavior: 'smooth' });
    }
}

}