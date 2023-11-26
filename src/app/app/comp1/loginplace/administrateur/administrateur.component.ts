import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/app/services/authservice.service';

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css']
})
export class AdministrateurComponent {
  constructor(private auths: AuthserviceService, private router: Router) {}

  onDisconnect() {
    this.auths.logout();
    this.router.navigate(['/login']);
  }
}
