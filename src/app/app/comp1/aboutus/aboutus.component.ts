import { Component, OnInit } from '@angular/core';
import { Members } from '../../classes/members';
import { MembersService } from '../../services/members.service';
import { Gallery } from '../../classes/gallery';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  lesimages: Gallery[] = [];
  lesmembres: Members[] = [];
  searchtext: string = '';//pour la barre de recherche

  constructor(private membreservice: MembersService) {}

  ngOnInit(): void {
    this.membreservice.getMembres().subscribe(
      data => {
        this.lesmembres = data;
      }
    );
    this.membreservice.getgallery().subscribe(
      datag => {
        this.lesimages = datag;
      }
    );
  }
  //pour le hover des membres
  currentmember!:Members ;
  show:boolean=false;
  showDetails(member:Members){
    this.show=true;
    this.currentmember=member;
    
  }
  hideDetails(member:Members){
    this.show=false;
    this.currentmember=member
  }


//pour la barre de recherche des membres
  searchmembers() { 
  
    //filter les members en se bassant sur l'id ou le nom
        this.membreservice.getMembres().subscribe((data) => {
          const searchTextLower = this.searchtext.toLowerCase();
      
          this.lesmembres = data.filter(
            (lesmembres) =>
              lesmembres.id.toString().includes(searchTextLower) ||
              lesmembres.nom_pren.toLowerCase().includes(searchTextLower)
          );
        });
      }

}