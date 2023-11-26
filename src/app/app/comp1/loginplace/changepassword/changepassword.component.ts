import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/app/services/authservice.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent  {
  frm: FormGroup;

  constructor(private loginService: AuthserviceService, private fb: FormBuilder) {
    this.frm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  //fonction pour le changement du mot de passe
  changerpass() {
    const currentPassword = this.frm.get('currentPassword')?.value;
    const newPassword = this.frm.get('newPassword')?.value;
    const confirmPassword = this.frm.get('confirmPassword')?.value;

    if (currentPassword === this.loginService.password && newPassword === confirmPassword) {
      this.loginService.changerpassword(newPassword);
      alert('mot de passe changer avec succés');
      this.frm.reset();//faire reset pour le formulaire apres changerement du mot de passe
    } else {
      alert('le mot de passe est incorrect,veuillez vérifier!');
      this.frm.reset();//faire reset pour le formulaire si l'un des champs est incorrect
    }
  }
}