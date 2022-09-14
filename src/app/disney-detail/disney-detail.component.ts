import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../model/character.model';
import { characterList } from '../services/character-service';

@Component({
  selector: 'app-disney-detail',
  templateUrl: './disney-detail.component.html',
  styleUrls: ['./disney-detail.component.scss']
})

export class DisneyDetailComponent implements OnInit {
  characterList: Character[] = characterList;
  character: Character | undefined;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.characterList
    const characterId: string | null = this.route.snapshot.paramMap.get('id')
    if (characterId) {
      this.character = this.characterList.find(char => char._id == +characterId)
    }
  }
  goBack() {
    this.router.navigate(['disney'])
  }
}
