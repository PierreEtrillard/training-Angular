import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../model/character.model';
import { CharacterService } from '../services/character-service';


@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss']
})
export class CharacterFormComponent implements OnInit {
  @Input() character: Character;
  alliesList: string[] | undefined;
  characterDetails: Character | undefined;
  characterId: any;

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    const currentUrl: string = document.location.href;
    const characterId: string = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
    this.characterDetails = this.characterService.getCharacterById(+characterId);
    this.alliesList = this.characterDetails?.allies;
  }
  hasAllie(allie: string): boolean {
    return this.character.allies.includes(allie)
  }
  selectAllie($event: Event, allie: string) {
    const isCheked = ($event.target as HTMLInputElement).checked;
    if (isCheked) {
      this.character.allies.push(allie);
    } else {
      const index = this.character.allies.indexOf(allie);
      this.character.allies.splice(index, 1)
    }
  }
  onSubmit() {
console.log('Sub Formulaire/'+ this.characterDetails?._id);
this.router.navigate([`/disney/${this.characterDetails?._id}`])

  }
}
