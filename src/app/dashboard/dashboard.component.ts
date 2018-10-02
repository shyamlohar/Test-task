import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataqueryService } from '../dataquery.service';
import { Observable } from 'rxjs';
import { AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  restros: Array<any>;
  favRestros: Array<any>;
  byCityRestros: Array<any>;
  byCountryRestros: Array<any>;
  byRatingRestros: Array<any>;
  displayAll: Boolean = true;
  displayFav: Boolean = false;
  displayByCity: Boolean = false;
  displayBycountry: Boolean = false;
  displayByRating: Boolean = false;

  constructor(private auth: AuthService, private query: DataqueryService) {
    this.query.getRestaurantsFor().subscribe(val => this.restros = val.map(v => {
      return { key: v.key, ...v.payload.val() }
    }).reverse())

    this.query.getRestaurantsFor().subscribe(val => this.favRestros = val.map(v => {
      return { key: v.key, ...v.payload.val() }
    }).filter(val => val.isfav == true))

    this.query.getRestaurantsFor().subscribe(val => this.byCityRestros = _.sortBy(val.map(v => {
      return { key: v.key, ...v.payload.val() }
    }), 'city'))

    this.query.getRestaurantsFor().subscribe(val => this.byCountryRestros = _.sortBy(val.map(v => {
      return { key: v.key, ...v.payload.val() }
    }), 'country'))

    this.query.getRestaurantsFor().subscribe(val => this.byRatingRestros = _.sortBy(val.map(v => {
      return { key: v.key, ...v.payload.val() }
    }), 'rating'))

  }

  ngOnInit() {

  }

  addToFav(rest) {
    console.log(rest)
    this.query.addToFav(rest)
  }

  // showFav() {
  //   this.displayBycountry = false;
  //   this.displayByCity = false;
  //   this.displayByRating = false;
  //   this.displayFav = true;
  //   this.displayAll = false;
  // }

  // showCountry() {
  //   this.displayBycountry = true;
  //   this.displayByCity = false;
  //   this.displayByRating = false;
  //   this.displayFav = false;
  //   this.displayAll = false;
  // }

  // showCity() {
  //   this.displayBycountry = false;
  //   this.displayByCity = true;
  //   this.displayByRating = false;
  //   this.displayFav = false;
  //   this.displayAll = false;
  // }

  // showRating() {
  //   this.displayBycountry = false;
  //   this.displayByCity = false;
  //   this.displayByRating = true;
  //   this.displayFav = false;
  //   this.displayAll = false;
  // }

  // showAll() {
  //   this.displayBycountry = false;
  //   this.displayByCity = false;
  //   this.displayByRating = false;
  //   this.displayFav = false;
  //   this.displayAll = true;
  // }

  sort(val) {
    let sorters = ['displayAll', 'displayByCity', 'displayBycountry', 'displayFav', 'displayByRating']
    sorters.forEach(val => {
      this[val] = false
    })
    this[val] = true
  }

}
