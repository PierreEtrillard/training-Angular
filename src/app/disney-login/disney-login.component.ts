import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-disney-login',
  templateUrl: './disney-login.component.html',
  styleUrls: ['./disney-login.component.scss']
})
export class DisneyLoginComponent implements OnInit {
  name: string;
  password: string;
  message: string = "Vous êtes déconnecté"
  auth: AuthService

  constructor(
    private authService: AuthService,
    private router: Router) { }
  ngOnInit() {this.auth = this.authService}

  setMessage() {
    if (this.auth.isLoggedIn) {
      this.message = "Connection effectué !"
    } else {
      this.message = "Identifiant ou mot de passe incorrect !"
    }
  }
  login() {
    this.message = "connection en cours";
    this.auth.login(this.name, this.password)
    .subscribe((isLoggedIn: boolean) => {
      this.setMessage();
      if (isLoggedIn) {
        this.router.navigate(["disney/favoris"])
      } else {
        this.password = "";
        this.router.navigate(["disney/login"])
      }  
    })
  }
  logout(){
    this.auth.logOut();
    this.message ="Vous êtes déconnectez !"
  }
}

