import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../model/character.model';
import { CharacterService } from '../services/character-service';

@Component({
  selector: 'app-disney-detail',
  templateUrl: './disney-detail.component.html',
  styleUrls: ['./disney-detail.component.scss']
})

export class DisneyDetailComponent implements OnInit {
  characterList: Character[] ;
  character: Character | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService :CharacterService) { }

  ngOnInit() {
    this.characterList = this.characterService.getCharactersList()
    const characterId: string | null = this.route.snapshot.paramMap.get('id')
    if (characterId) {
      this.character = this.characterService.getCharacterById(+characterId)
    }
  }
  goBack() {
    this.router.navigate(['disney'])
  }
  editCharacter(){
    const characterId: string | null = this.route.snapshot.paramMap.get('id')
    if (characterId) {
      this.character = this.characterService.getCharacterById(+characterId)
      this.router.navigate([`disney/submit/${+characterId}`])
    }
}
}