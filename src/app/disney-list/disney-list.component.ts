import { Component, OnInit } from '@angular/core';
import { Character } from '../model/character.model';
import { CharacterService } from '../services/character-service'
import { faMagnifyingGlass, faCircleXmark, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disney-list',
  templateUrl: './disney-list.component.html',
  styleUrls: ['./disney-list.component.scss']
})

export class DisneyListComponent implements OnInit {
  faCircleXmark = faCircleXmark;
  faMagnifyingGlass = faMagnifyingGlass;
  faPlay = faPlay;
  disneyList: Character[] ;
  name: string | undefined = "Vous n'avez encore rien";
  image: string = "./../assets/images/Disney_logo.webp";
  wrongChoice: boolean = false;
  wrongMessage:string = "Ce personnage n'est pas référencé";
  page:number = 2;

  constructor(
    private router: Router,
    private characterService:CharacterService) { }
  ngOnInit() {
    this.disneyList = this.characterService.getCharactersList(this.page)
  }
  selCharacter(nameSearched: string | undefined) {
    const index: number = (this.disneyList).findIndex((objTargeted: any) => objTargeted.name === nameSearched)
    if (index >= 0 && index < 50) {
      console.log(index);
      this.name = this.disneyList[index].name;
      this.image = `${this.disneyList[index].imageUrl}`;
      this.wrongChoice = false;
    } else { this.wrongChoice = true }
  }
  navOnDetail() {
    if (this.name !== "Vous n'avez encore rien") {
      const id: number | undefined = (this.disneyList).find((char) => char.name === this.name)?._id
      this.router.navigate([`disney/${id}`])
    }else{
      this.wrongMessage = "Choissisez d'abord un perssonage";
      this.wrongChoice = true;
    }
  }

}
