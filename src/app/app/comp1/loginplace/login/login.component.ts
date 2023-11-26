import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/app/services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  frm!: FormGroup;

  constructor(private router: Router, private authService: AuthserviceService, private fb: FormBuilder) {}

  ngOnInit() {
    this.frm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
//fonction pour faire login vers l'admin
  log() {
    if (this.frm.valid) {
      const username = this.frm.get('username')?.value;
      const password = this.frm.get('password')?.value;

      if (this.authService.login(username, password)) {
        this.router.navigate(['/admin/manage-members']);
      } else {
        alert("erreur, le mot de passe ou l'utulisateur est incorrect !!");
      }
    } else {
      alert('remplir tous le formulaire!');
    }
  }
}