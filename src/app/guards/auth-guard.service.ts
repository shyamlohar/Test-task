import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('uid')) {
      return true
    }
    console.log('hey')
    window.alert("You don't have permission to view this page,Please Login");
    return this.router.navigate['/login']
  }
}
