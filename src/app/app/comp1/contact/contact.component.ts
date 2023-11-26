import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SavedataService } from '../../services/savedata.service';
import { Commentaires } from '../../classes/commentaires';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  frm!: FormGroup;
  comments: Commentaires[] = [];

  constructor(private formBuilder: FormBuilder, private commentService: SavedataService) { }

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      Nom: ['', [Validators.required, Validators.minLength(3)]],
      Prenom: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      Telephone: ['', [Validators.required, Validators.pattern(/[1-9]{8}/)]],
      Sujet: ['', [Validators.required]],
      Message: ['', [Validators.required]]
    });

    this.commentService.getcomments().subscribe(
      data => this.comments = data
    )
    
  }
  
  enregistrer() {
    console.log(this.frm.value);
    this.commentService.addcomments(this.frm.value as Commentaires).subscribe
    ( data => console.log(data))
  }





  get nom() {
    return this.frm.get('Nom');
  }

  get prenom() {
    return this.frm.get('Prenom');
  }

  get email() {
    return this.frm.get('email');
  }

  get telephone() {
    return this.frm.get('Telephone');
  }

  get sujet() {
    return this.frm.get('Sujet');
  }

  get message() {
    return this.frm.get('Message');
  }

  
  

  isvalidnom() {
    return this.nom?.hasError('minlength') && this.nom?.touched;
  }

  isvalidprenom() {
    return this.prenom?.hasError('minlength') && this.prenom?.touched;
  }

  isvalidtelephone() {
    return this.telephone?.hasError('pattern') && this.telephone?.touched;
  }
}
