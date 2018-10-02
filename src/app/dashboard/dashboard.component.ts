import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataqueryService } from '../dataquery.service';
import { Observable } from 'rxjs';
import { AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  restros: any;
  favRestros: any;
  displayAll: Boolean = true;
  displayFav: Boolean = false;

  constructor(private auth: AuthService, private query: DataqueryService) {
    this.query.getRestaurantsFor().subscribe(val => this.restros = val.map(v => {
      return { key: v.key, ...v.payload.val() }
    }))
    this.query.getRestaurantsFor().subscribe(val => this.favRestros = val.map(v => {
      return { key: v.key, ...v.payload.val() }
    }).filter(val => val.isfav == true))
  }

  ngOnInit() {

  }

  addToFav(rest) {
    console.log(rest)
    this.query.addToFav(rest)
  }

  showFav() {
    this.displayFav = !this.displayFav
    this.displayAll = !this.displayAll
  }

  showAll() {
    this.displayFav = !this.displayFav
    this.displayAll = !this.displayAll
  }


}
