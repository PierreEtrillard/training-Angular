import { Component, OnInit } from '@angular/core';
import { Character } from '../model/character.model';
import { CharacterService } from '../services/character-service'
import { faMagnifyingGlass, faCircleXmark, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, lastValueFrom, Observable, Subject, switchMap } from 'rxjs';
// import autoComplete from "@tarekraafat/autocomplete.js";
// const autoCompleteJS = new autoComplete({
//   placeHolder: "Search for Food...",
//   data: {
//       src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"]
//   },
//   resultItem: {
//       highlight: true,
//   }
// });
@Component({
  selector: 'app-disney-list',
  templateUrl: './disney-list.component.html',
  styleUrls: ['./disney-list.component.scss']
})

export class DisneyListComponent implements OnInit {
  //icones fawesomes
  faCircleXmark = faCircleXmark;
  faMagnifyingGlass = faMagnifyingGlass;
  faPlay = faPlay;

  disneyList: Character[];
  page: number;
  name: string | undefined = "Vous n'avez encore rien";
  image: string = "./../assets/images/Disney_logo.webp";
  selectedCharacter: Character | undefined ;
  //instance pour snackbars
  wrongChoice: boolean = false;
  wrongMessage: string = "Ce personnage n'est pas référencé";
  //moteur de recherche à l'aide de la class rxjs "Subject":
  searchTerms = new Subject<string>();// met en mémoire chaque entrées saisies et permet de piloter l'Observable
  characters$: Observable<Character  | undefined>;
  constructor(
    private router: Router,
    private characterService: CharacterService) { }
  async ngOnInit() {
    localStorage['page'] ? this.page = localStorage['page'] : this.page =1;
    this.disneyList = await this.characterService.getCharactersList({ page: this.page });
    /*this.characters$ = this.searchTerms.pipe(
      //        {..."n"."no"..."noù"."no"...."nom".....}
      debounceTime(300),//supprime les 300 premiére milliseconde de la saisie :
      //        {....."no"...."no"...."nom".....}
      distinctUntilChanged(),//supprime les entrées ayant des charactères identiques
      //saisie =  {....."no"........."nom".....}    
      switchMap((term)=> this.characterService.getCharacterByName(term))
      // traduit les Observables: "no et "nom en resultats(ici charr)

    )*/
  }

  selCharacter(nameSearched: string | undefined) {
    this.selectedCharacter = this.disneyList.find((char) => char.name === nameSearched)
    if (this.selectedCharacter !== undefined) {
      this.name = this.selectedCharacter.name;
      this.image = this.selectedCharacter.imageUrl;
      this.wrongChoice = false;
    } else { this.wrongChoice = true }
  }
  search(term:string){
    this.searchTerms.next(term);//next push sont parametre dans le flux de donnée
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
    this.disneyList = await this.characterService.getCharactersList({ page: this.page })
  }
}
