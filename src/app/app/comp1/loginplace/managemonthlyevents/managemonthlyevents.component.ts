import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Monthly } from 'src/app/app/classes/monthly';
import { EventsService } from 'src/app/app/services/events.service';

@Component({
  selector: 'app-managemonthlyevents',
  templateUrl: './managemonthlyevents.component.html',
  styleUrls: ['./managemonthlyevents.component.css']
})
export class ManagemonthlyeventsComponent implements OnInit {
  eventForm!: FormGroup;
  eventsm: Monthly[] = [];
  searchtext: string = '';
  visible: boolean = false;

  constructor(private fb: FormBuilder, private eventservice: EventsService) {}
//pour la recherche des événements en se basant sur le nom ou le lieu d'événement
  searchevents() {
    this.eventservice.getEventsM().subscribe((data) => {
      const searchTextLower = this.searchtext.toLowerCase();

      this.eventsm = data.filter(
        (events) =>
          events.lieu.toLowerCase().includes(searchTextLower) ||
          events.nom.toLowerCase().includes(searchTextLower)
      );
    });
  }

  ngOnInit() {
    this.eventForm = this.fb.group({
      id: ['', Validators.required],
      nom: ['', [Validators.required, Validators.maxLength(25)]],
      image: ['', Validators.required],
      lieu: ['', [Validators.required]],
      date: ['', [Validators.required, Validators.maxLength(20)]],
    });

    this.eventservice.getEventsM().subscribe(
      dataw => {
        this.eventsm = dataw;
      }
    );
  }
//fonction pour ajouter un événement

  addEvent() {
    this.visible = true;
    console.log(this.eventForm.value);
    console.log(this.eventForm.get("nom")?.value);
    console.log(this.eventForm.get("image")?.value);
    console.log(this.eventForm.get("lieu")?.value);
    console.log(this.eventForm.get("date")?.value);
    this.eventservice.addEventM(this.eventForm.value).subscribe(
      data => this.eventsm.push(data)
    );
    this.eventForm.reset();
  }

  activer() {
    if (this.eventForm.valid) {
      this.addEvent(); 
      this.visible = !this.visible;
    }
  }

//pour editer l'événement
  editwmonthly(event: Monthly) {
    this.eventForm.patchValue({
      id: event.id,
      nom: event.nom,
      image: event.image,
      lieu: event.lieu,
      date: event.date,
    });

    this.visible = true;
  }

  // pour valider les modifications
validerModifications(): void {
  if (this.eventForm.valid) {
    const copiedon: Monthly = { ...this.eventForm.value } as Monthly; // Crée une copie des valeurs du formulaire

    this.eventForm.patchValue(copiedon);

    const eventId = copiedon.id;//obtenir l'id d'événement a modifier

    const indiceev = this.eventsm.findIndex(event => event.id === eventId);   // Recherche l'indice de l'événement dans le tableau events

    if (indiceev !== -1) { 
      this.eventsm[indiceev] = { ...this.eventsm[indiceev], ...copiedon };// Met à jour l'objet événement dans le tableau avec les nouvelles valeurs
      this.eventservice.editEventW(copiedon).subscribe(   // Appelle le service pour mettre à jour l'événement côté serveur
        (updatedData: Monthly) => {
          this.eventsm[indiceev] = updatedData;  // Met à jour l'objet événement avec les données mises à jour depuis le serveur

        },
        (error: any) => {
          
          console.error('Erreur lors de la mise à jour de lévénement : ', error);
        }
      );
    }
  }

  
  this.visible = false;
  this.eventForm.reset();
}


//Validation des formulaires réactifs
  isvalidnom() {
    return this.eventForm.get('nom')?.hasError('maxlength') && this.eventForm.get('nom')?.touched;
  }
  //supprimer l'événement
  deleteEvent(id: number) {
    this.eventservice.deleteEventM(id).subscribe(
      () => {
        this.eventsm = this.eventsm.filter(event => event.id !== id);
        this.eventForm.reset();
      })
    }


}