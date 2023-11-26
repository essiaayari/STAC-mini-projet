// manage-members.component.ts

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Members } from 'src/app/app/classes/members';
import { MembersService } from 'src/app/app/services/members.service';

@Component({
  selector: 'app-manage-members',
  templateUrl: './managemembers.component.html',
  styleUrls: ['./managemembers.component.css']
})
export class ManageMembersComponent implements OnInit {

  memberForm!: FormGroup;
  members: Members[] = [];
  visible:boolean=false
  searchtext: string = '';

  constructor(private fb: FormBuilder,private membreservice:MembersService) {}

  ngOnInit() {
    this.memberForm = this.fb.group({
      id: ['', Validators.required],
      nom_pren:['',[Validators.required, Validators.maxLength(25)]],
      image:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      poste:['',[Validators.required,Validators.maxLength(20)]],
      facebook:['',Validators.required],
      instagram:['',Validators.required]

    });
    this.membreservice.getMembres().subscribe(
      data =>{
        this.members=data
      }
    )
    
  }

  //pour la barre de recherche 

  searchMembers() { 
  
//filtrer les membre en se basant sur l'id ou le nom du membre
    this.membreservice.getMembres().subscribe((data) => {
      const searchTextLower = this.searchtext.toLowerCase();
  
      this.members = data.filter(
        (member) =>
          member.id.toString().includes(searchTextLower) ||
          member.nom_pren.toLowerCase().includes(searchTextLower)
      );
    });
  }
  
//fonction pour ajouter un membre
  addMember() {
    this.visible=true;
    console.log(this.memberForm.value);
    console.log(this.memberForm.get("nom_pren")?.value);
    console.log(this.memberForm.get("email")?.value);
    console.log(this.memberForm.get("image")?.value);
    console.log(this.memberForm.get("poste")?.value);
    console.log(this.memberForm.get("facebook")?.value);
    console.log(this.memberForm.get("instagram")?.value);
    this.membreservice.addMember(this.memberForm.value).subscribe(
      data => this.members.push(data)
    );
    this.memberForm.reset();

  }
//pour afficher le formulaire
  activer(){
    if(this.memberForm.valid){
    this.addMember;
    this.visible=!this.visible;
  }
  }

  //fonction pour editer un membre
  editMember(member: Members) {
    this.memberForm.patchValue({
      id: member.id,
      nom_pren: member.nom_pren,
      image: member.image,
      email:member.email,
      poste: member.poste,
      facebook: member.facebook,
      instagram:member.instagram
    });

    this.visible = true;
  }

  //pour valider les modifications
  validerModifications(): void {
    if (this.memberForm.valid) {
      const copiedon: Members = { ...this.memberForm.value } as Members;

      this.memberForm.patchValue(copiedon);

      const eventId = copiedon.id;
      const indiceev = this.members.findIndex(member => member.id === eventId);

      if (indiceev !== -1) {
        this.members[indiceev] = { ...this.members[indiceev], ...copiedon };

        this.membreservice.editmembers(eventId, copiedon).subscribe(
          (updatedData: Members) => {
            this.members[indiceev] = updatedData;
          },
          (error: any) => {
            console.error('Erreur lors de la mise à jour du membre : ', error);
          }
        );
      }
      }

      this.visible = false;
      this.memberForm.reset();
    }
  
  


//fonction pour supprimer un membre
  deleteMember(id: number) {
    this.membreservice.deleteMember(id).subscribe(
      /*on a utilisé fct filtrer pour effecer du html du tableau */
      ()=>{this.members=this.members.filter(member => member.id !==  id)}
    );
    this.memberForm.reset();
  }

get nom_pren(){
  return this.memberForm.get('nom_pren');
}

get email(){
  return this.memberForm.get('email');
}

get poste(){
  return this.memberForm.get('poste');
}

get image(){
  return this.memberForm.get('image');
}

get facebook(){
  return this.memberForm.get('facebook');
}

get instagram(){
  return this.memberForm.get('instagram');
}
//validation du formulaire
isvalidnom() {
    return this.memberForm.get('nom_pren')?.hasError('maxlength') && this.memberForm.get('nom_pren')?.touched

  }




}