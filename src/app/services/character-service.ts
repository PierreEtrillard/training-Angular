
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { Character, DisneyApiRes } from "../model/character.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, lastValueFrom, Observable, of, tap } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    characterList: Character[]
    constructor(private http: HttpClient) { }

    async getCharactersList(page: number): Promise<Character[]> {
        const resApi: Observable<DisneyApiRes> = this.http.get<DisneyApiRes>(`https://api.disneyapi.dev/characters?page=${page}`).pipe(
            tap((res) => console.table(res.data)),
            catchError((err) => {
                console.log(err);
                return of()
            })
        );
        this.characterList = (await lastValueFrom(resApi)).data
        // resApi.subscribe(res => this.characterList = lastValueFrom(res.data));
        return this.characterList
    }

    async getCharacterById(characterId: number): Promise<Character | undefined> {
        return (await this.characterList).find(character => character._id == characterId)
    }
    putCharacter(character: Character): Observable<Character> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
        return this.http.put('api/disneyCharacters', character, httpOptions)
            .pipe(tap((res: any) => console.table(res))
            )
    }

}