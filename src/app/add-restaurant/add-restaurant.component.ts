import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs'
import { map } from "rxjs/operators";
import { AuthService } from '../auth.service';
import { DataqueryService } from "../dataquery.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss']
})
export class AddRestaurantComponent implements OnInit {

  // form inputs and related datas
  myForm: FormGroup;
  name: FormControl;
  file: FormControl;
  location: FormControl;
  rating: FormControl;
  date: FormControl;
  fileName: String = "Select Image"
  city: String;
  country: String;
  uploadFile: File;
  invalidForm: Boolean;
  downloadUrl: Observable<String>;
  uploadProgress: Observable<any>;
  uid: String;

  //angular firebase tasks and reference
  task: AngularFireUploadTask
  ref: AngularFireStorageReference

  //databse data
  items: AngularFireList<any[]>;


  constructor(private afStorage: AngularFireStorage, private db: AngularFireDatabase,
    private auth: AuthService, private query: DataqueryService, private router: Router) {

    this.items = this.db.list('/restro');
    this.auth.userInfo().subscribe(user => this.uid = user.uid)
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  onFileChange(event) {
    this.uploadFile = event.target.files[0]
    this.fileName = event.target.files[0].name
  }

  createFormControls() {
    this.name = new FormControl('', [
      Validators.required,
    ])
    this.date = new FormControl('', [
      Validators.required
    ])
    this.file = new FormControl('', [
      Validators.required
    ])
    this.location = new FormControl('', [
      Validators.required
    ])
    this.rating = new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])
  }

  createForm() {
    this.myForm = new FormGroup({
      name: this.name,
      date: this.date,
      file: this.file,
      location: this.location,
      rating: this.rating,
    });
  }

  // addNewRestaurant() {
  //   const id = Math.random().toString(36).substring(2);
  //   this.ref = this.afStorage.ref(id);
  //   this.task = this.ref.put(this.uploadFile);
  //   this.task.snapshotChanges().pipe(
  //     finalize(() => this.ref.getDownloadURL().subscribe(url => {
  //       let date = this.myForm.value.date.toString();
  //       let city = this.city
  //       let country = this.country
  //       let data = { id: this.uid, ...this.myForm.value, date, url, city, country }
  //       this.items.push(data)
  //       this.router.navigate(['/dashboard'])
  //     }))
  //   )
  //     .subscribe()
  //   this.uploadProgress = this.task.snapshotChanges()
  //     .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
  // }

  addNewRestaurant() {
    if (!this.myForm.valid) {
      this.invalidForm = true;
    }
    else {
      console.log('ayy')
      const id = Math.random().toString(36).substring(2);
      this.ref = this.afStorage.ref(id);
      this.task = this.ref.put(this.uploadFile);
      this.task.snapshotChanges().pipe(
        finalize(() => this.ref.getDownloadURL().subscribe(url => {
          let date = this.myForm.value.date.toString();
          let city = this.city
          let country = this.country
          let data = { id: this.uid, ...this.myForm.value, date, url, city, country }
          this.items.push(data)
          this.router.navigate(['/dashboard'])
        }))
      )
        .subscribe()
      this.uploadProgress = this.task.snapshotChanges()
        .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
    }
  }


  handleAddressChange(e) {
    let data = e.formatted_address.split(',').reverse()
    if (data.length >= 3) {
      this.country = data[0].trim()
      this.city = data[2].trim()
    }
    else {
      this.country = data[0].trim()
      this.city = data[1].trim()
    }
  }

}
