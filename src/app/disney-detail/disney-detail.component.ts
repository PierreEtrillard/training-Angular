import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character,Favoris } from '../model/character.model';
import { CharacterService } from '../services/character-service';

@Component({
  selector: 'app-disney-detail',
  templateUrl: './disney-detail.component.html',
  styleUrls: ['./disney-detail.component.scss']
})

export class DisneyDetailComponent implements OnInit {
  characterId: string | null
  character: Character|undefined ;
  favori:Favoris;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService :CharacterService) { }

  async ngOnInit() {
    this.characterId = this.route.snapshot.paramMap.get('id')
    if (this.characterId) {
      this.character = await this.characterService.getCharacterById(+this.characterId)
      }
    }
  
  goBack() {
    this.router.navigate(['disney'])
  }
  async addToFavories(){      
    if(this.character!=undefined){
      this.favori ={
      name: this.character.name,
      characterId :  this.character._id,
      imageUrl : this.character.imageUrl,
      likesArray:[""],
      dislikesArray:[""]
    }
      this.characterService.postFavori(await this.favori).subscribe(()=> this.router.navigate([`disney/favoris`]))
      this.router.navigate(['disney/favoris'])
    }
}
}