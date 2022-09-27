import { Component, Input, OnInit } from '@angular/core';
import { User } from '../model/user-model';
import { UserService } from '../services/user-service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
dataUser:User;
nom: string;
prenom: string;
mail: string;
password: string;
message: string|undefined = "Inscription Validée"

  constructor(private userService:UserService,private router: Router,) { }
  ngOnInit() {
  };
  onSubmit() {
    this.dataUser  ={
      nom:this.nom,
      prenom:this.prenom,
      mail:this.mail,
      password:this.password};
      this.userService.newUser(this.dataUser).subscribe(()=>this.router.navigate(['/disney']))

  }
}
