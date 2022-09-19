import { Component, OnInit } from '@angular/core';
import { Character } from '../model/character.model';
import { CharacterService } from '../services/character-service'
import { faMagnifyingGlass, faCircleXmark, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-disney-list',
  templateUrl: './disney-list.component.html',
  styleUrls: ['./disney-list.component.scss']
})

export class DisneyListComponent implements OnInit {
  faCircleXmark = faCircleXmark;
  faMagnifyingGlass = faMagnifyingGlass;
  faPlay = faPlay;
  disneyList: Character[];
  page: number;
  name: string | undefined = "Vous n'avez encore rien";
  image: string = "./../assets/images/Disney_logo.webp";
  selectedCharacter: Character | undefined ;
  wrongChoice: boolean = false;
  wrongMessage: string = "Ce personnage n'est pas référencé";

  constructor(
    private router: Router,
    private characterService: CharacterService) { }
  async ngOnInit() {
    localStorage['page'] ? this.page = localStorage['page'] : this.page =1;
    console.log(this.page);
    this.disneyList = await this.characterService.getCharactersList(this.page);
  }

  selCharacter(nameSearched: string | undefined) {
    this.selectedCharacter = this.disneyList.find((char) => char.name === nameSearched)
    console.table(this.disneyList)
    if (this.selectedCharacter !== undefined) {
      this.name = this.selectedCharacter.name;
      this.image = this.selectedCharacter.imageUrl;
      this.wrongChoice = false;
    } else { this.wrongChoice = true }
  }

  navOnDetail() {
    if (this.name !== "Vous n'avez encore rien") {
      this.router.navigate([`disney/${this.selectedCharacter?._id}`])
    } else {
      this.wrongMessage = "Choissisez d'abord un perssonage";
      this.wrongChoice = true;
    }
  }
  async selPage(selection: string) {
    if (this.page >= 1 && this.page < 150) {
      switch (selection) {
        case 'previous':
          this.page != 1 ? --this.page :this.page = 149
          break;
        case 'next':
          this.page != 149 ? ++this.page :this.page = 1
          break;
      }
    };
    localStorage['page'] = this.page    
    this.disneyList = await this.characterService.getCharactersList(this.page)
  }
}
