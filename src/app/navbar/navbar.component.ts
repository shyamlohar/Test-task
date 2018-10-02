import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: any = null;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.afAuth.authState.subscribe(auth => this.isLoggedIn = auth)

  }
  ngOnInit() {
  }

  logout() {
    this.auth.logout()
  }

}
