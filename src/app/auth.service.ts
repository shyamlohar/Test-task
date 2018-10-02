import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uid: String = "loo"

  constructor(public afAuth: AngularFireAuth, public router: Router) { }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((user) => {
      // this.uid = user.user.uid
      localStorage.setItem('uid', user.user.uid)
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('uid');
    this.router.navigate(['/home'])
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
