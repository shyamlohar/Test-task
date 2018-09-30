import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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

  registerUser() {
    if (this.myForm.valid) {
      this.authService.emailSignUp(this.myForm.value)
    }
  }

  login() {
    this.authService.login()
  }

}
