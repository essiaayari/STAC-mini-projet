import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Weekly } from 'src/app/app/classes/weekly';
import { EventsService } from 'src/app/app/services/events.service';

@Component({
  selector: 'app-manageweeklyevents',
  templateUrl: './manageweeklyevents.component.html',
  styleUrls: ['./manageweeklyevents.component.css']
})
export class ManageweeklyeventsComponent implements OnInit {
  eventForm!: FormGroup;
  eventsw: Weekly[] = [];
  searchtext: string = '';
  visible: boolean = false;

  constructor(private fb: FormBuilder, private eventservice: EventsService) {}

//pour la recherche des événements en se basant sur le nom ou le lieu d'événement
searchevents() {
    this.eventservice.getEventsW().subscribe((data) => {
      const searchTextLower = this.searchtext.toLowerCase();

      this.eventsw = data.filter(
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

    this.eventservice.getEventsW().subscribe(
      dataw => {
        this.eventsw = dataw;
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
    this.eventservice.addEventW(this.eventForm.value).subscribe(
      data => this.eventsw.push(data)
    );
    this.eventForm.reset();
  }

  //pour afficher le formulaire 
  activer() {
    if (this.eventForm.valid) {
      this.addEvent(); 
      this.visible = !this.visible;
    }
  }
//pour supprimer un événement
  deleteEvent(id: number) {
    this.eventservice.deleteEventW(id).subscribe(
      () => {
        this.eventsw = this.eventsw.filter(event => event.id !== id);
      }
    );
    this.eventForm.reset();
  }

  //pour editer un événement
  editweekly(event: Weekly) {
    this.eventForm.patchValue({
      id: event.id,
      nom: event.nom,
      image: event.image,
      lieu: event.lieu,
      date: event.date,
    });

    this.visible = true;
  }

  //pour valider les modifications
  validerModifications(): void {
    if (this.eventForm.valid) {
      const copiedon: Weekly = { ...this.eventForm.value } as Weekly;

      this.eventForm.patchValue(copiedon);

      const eventId = copiedon.id;
      const indiceev = this.eventsw.findIndex(event => event.id === eventId);

      if (indiceev !== -1) {
        this.eventsw[indiceev] = { ...this.eventsw[indiceev], ...copiedon };

        this.eventservice.editEventW( copiedon).subscribe(
          (updatedData: Weekly) => {
            this.eventsw[indiceev] = updatedData;
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
}