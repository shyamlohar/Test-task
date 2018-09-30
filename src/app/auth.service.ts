import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, public router: Router) { }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  userInfo() {
    return this.afAuth.user
  }

  emailSignUp(credentials) {
    this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((val) => {
        console.log(val);
        this.router.navigate(['/']);
      })
  }

  emailLogin(credentials) {
    this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
  }

}
