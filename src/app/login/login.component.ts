import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";


import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  email: FormControl;
  password: FormControl;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ])

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  }

  createForm() {
    this.myForm = new FormGroup({
      email: this.email,
      password: this.password
    })
  }

  loginEmailUser() {
    if (this.myForm.valid) {
      console.log(this.myForm.value)
      // this.authService.emailLogin(this.myForm.value)
    }
  }

  login() {
    this.authService.login()
  }

  retriveUser() {
    this.authService.userInfo().subscribe(user => console.log(user))
  }

}
