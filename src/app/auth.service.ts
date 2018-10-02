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
      this.router.navigate['/dashboard']
      window.location.reload()
    });
  }

  regGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((user) => {
      // this.uid = user.user.uid
      localStorage.setItem('uid', user.user.uid)
      this.router.navigate['/welcome']
      window.location.reload()
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('uid');
    window.location.reload()
    this.router.navigate(['/home'])
  }

  userInfo() {
    return this.afAuth.user
  }

  emailSignUp(credentials) {
    this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((user) => {
        this.router.navigate(['/welcome']);
        localStorage.setItem('uid', user.user.uid)
      }, (err) => {
        this.router.navigate(['/register', { 'register': 'fail' }])
      })
  }

  emailLogin(credentials) {
    this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((val) => {
        this.router.navigate(['/dashboard'])
        localStorage.setItem('uid', val.user.uid)
      }, (err) => {
        console.log(err)
        this.router.navigate(['/login', { 'login': 'fail' }])
      })
  }

}
