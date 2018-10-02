import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs'
import { map } from "rxjs/operators";
import { AuthService } from '../auth.service';
import { DataqueryService } from "../dataquery.service";

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
  rating: FormControl;
  date: FormControl;
  fileName: String = "Select Image"
  uploadFile: File;
  downloadUrl: Observable<String>;
  uploadProgress: Observable<any>;
  uid: String;

  //angular firebase tasks and reference
  task: AngularFireUploadTask
  ref: AngularFireStorageReference

  //databse data
  items: AngularFireList<any[]>;


  constructor(private afStorage: AngularFireStorage, private db: AngularFireDatabase,
    private auth: AuthService, private query: DataqueryService) {

    this.items = this.db.list('/restro');
    this.auth.userInfo().subscribe(user => this.uid = user.uid)
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  onFileChange(event) {
    console.log(event.target.files[0])
    this.uploadFile = event.target.files[0]
    this.fileName = event.target.files[0].name
  }

  createFormControls() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
    this.date = new FormControl('', [
      Validators.required
    ])
    this.rating = new FormControl('', [
      Validators.required
    ])
  }

  createForm() {
    this.myForm = new FormGroup({
      name: this.name,
      date: this.date,
      rating: this.rating,
    });
  }

  addNewRestaurant() {
    console.log(this.myForm.value);
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(this.uploadFile);
    this.task.snapshotChanges().pipe(
      finalize(() => this.ref.getDownloadURL().subscribe(url => {
        let date = this.myForm.value.date.toString();
        let data = { id: this.uid, ...this.myForm.value, date, url }
        this.items.push(data)
      }))
    )
      .subscribe()
    this.uploadProgress = this.task.snapshotChanges()
      .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
  }

}
