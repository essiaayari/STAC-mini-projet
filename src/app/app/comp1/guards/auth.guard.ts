import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateFn } from '@angular/router';
import { AuthserviceService } from '../../services/authservice.service';


export const authGuard: CanActivateFn = (route, state) => {

  const router=inject(Router);
  const authservice=inject(AuthserviceService);

    if (authservice.isAuthenticated) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  };