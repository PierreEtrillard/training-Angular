import { Component, OnInit } from '@angular/core';
import { Favoris } from '../model/character.model';
import { CharacterService } from '../services/character-service';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.scss']
})
export class FavorisComponent implements OnInit {
favorisList:Favoris[]
favori:Favoris
  constructor(private characterService : CharacterService) { }

  async ngOnInit() {
  this.favorisList = await this.characterService.getFavorisList()

  }
 onClickRemove(id:number){
    console.log(id);    
  return this.characterService.getOneFavori(id)
  }
  onClickadd(id:number){
  return this.characterService.getOneFavori(id)
  }


}
