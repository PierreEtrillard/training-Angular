import { Component, OnInit } from '@angular/core';
import { Character } from '../model/character.model';
import { characterList } from '../services/character-service'
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-disney-list',
  templateUrl: './disney-list.component.html',
  styleUrls: ['./disney-list.component.scss']
})

export class DisneyListComponent implements OnInit {
  faCircleXmark = faCircleXmark;
  faMagnifyingGlass = faMagnifyingGlass;
  disneyList: Character[] = characterList;
  name: string | undefined = "Vous n'avez encore rien";
  image: string = "./../assets/images/Disney_logo.webp";
  wrongChoice: boolean = false
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    console.table(this.disneyList);
  }
  selCharacter(nameSearched: string | undefined) {
    const index: number = this.disneyList.findIndex((objTargeted: any) => objTargeted.name === nameSearched)
    if (index >= 0 && index < 50) {
      console.log(index);
      this.name = this.disneyList[index].name;
      this.image = `${this.disneyList[index].imageUrl}`;
      this.wrongChoice = false;
    } else { this.wrongChoice = true }
  }
  navOnDetail() {
    if (this.name !== "Vous n'avez encore rien") {
      const id: number | undefined = this.disneyList.find((char) => char.name === this.name)?._id
      this.router.navigate([`disney/${id}`])

    }
  }
}
