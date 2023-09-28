import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  LOGIN_URL = 'http://localhost:4000/auth/login';

  constructor(private http: HttpClient){}

  Login(){
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    const headers = new HttpHeaders({'Content-type': 'application/json'});

    const reqObject = {
      username: username,
      password: password
    }

    this.http.post(this.LOGIN_URL, reqObject, {headers: headers}).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("User logged in!");
      }
    )
  }
}
