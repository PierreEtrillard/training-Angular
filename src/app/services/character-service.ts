
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { Character, DisneyApiRes } from "../model/character.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    characterList: Character[]
    constructor(private http: HttpClient) { }


    getCharactersList(page:number): Character[] { 
        const resApi: Observable<DisneyApiRes>= this.http.get<DisneyApiRes>(`https://api.disneyapi.dev/characters?page=${page}`).pipe(
                tap((res) => console.table(res.data)),
                catchError((err) => {
                    console.log(err);
                    return of()
                })
            );
        resApi.subscribe(res=>this.characterList=res.data);
        return this.characterList
    }

    getCharacterById(characterId: number): Character | undefined {
        return this.characterList.find(character => character._id == characterId)
    }

}