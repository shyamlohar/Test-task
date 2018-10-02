import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from "rxjs";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataqueryService {

  //restaurant database
  //databse data

  constructor(private db: AngularFireDatabase, private auth: AuthService) {

    // this.restaurants = this.db.list('/restro');
    this.auth.userInfo().subscribe(user => this.uid = user.uid)
  }

  restaurants: AngularFireList<any>;
  userRestaurants: AngularFireList<any>;
  uid: any;

  addNewRestaurant(data) {
    this.restaurants.push(data)
  }

  addToFav(rest) {
    this.db.object(`/restro/${rest.key}`).
      update({ ...rest, isfav: true })
  }

  getRestaurantsFor() {
    console.log(localStorage.getItem('uid'))
    this.userRestaurants = this.db.list('/restro', ref => ref.orderByChild('id').equalTo(localStorage.getItem('uid')))
    return this.userRestaurants.snapshotChanges()
  }
}
