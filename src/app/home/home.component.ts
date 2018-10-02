import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn: any;

  constructor(private auth: AuthService) {
    this.auth.afAuth.authState.subscribe(val => this.isLoggedIn = val)
  }

  ngOnInit() {
  }

  fetch() {
    this.auth.userInfo().subscribe(val => console.log(val))
  }

  logout() {
    this.auth.logout()
  }

}
