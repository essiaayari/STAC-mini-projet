import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  public isAuthenticated: boolean = false;
  public password: string = 'pwd';

  //fonction login
  login(admin: string, pwd: string): boolean {
    if (admin === 'admin' && pwd === this.password) {
      this.isAuthenticated = true;
      console.log('connexion avec succés');
      return true;
    } else {
      this.isAuthenticated = false;
      console.log('erreur,Veuillez vérifier le mot de passe ou utilisateur');
      return false;
    }
  }
  //fonction pour changer le mot de passe 

  changerpassword(newPassword: string): void {
    this.password = newPassword;
  }

  //fonction pour  logout

  logout(): void {
    this.isAuthenticated = false;
  }

}