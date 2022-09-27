
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { Character, DisneyApiRes, Favoris } from "../model/character.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, lastValueFrom, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
const urlFavorisPost = environment.urlFavorisPost

@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    characterList: Character[];
    favorisList: Favoris[];
    favori: Favoris;
    
    constructor(private http: HttpClient) { }

    async getCharactersList({ page }: { page: number; }): Promise<Character[]> {
        const resApi: Observable<DisneyApiRes> = this.http.get<DisneyApiRes>(`https://api.disneyapi.dev/characters?page=${page}`).pipe(
            tap((res) => console.table(res)),
            catchError((err) => {
                console.log(err);
                return of()
            })
        );
        this.characterList = (await lastValueFrom(resApi)).data
        return this.characterList
    }

    async getCharacterById(characterId: number): Promise<Character | undefined> {
        return (await this.characterList).find(character => character._id == characterId)
    }
    async getCharacterByName(characterName:string): Promise<Character | undefined> {
        return (await this.characterList).find(character => character.name == characterName)
    }
    // searchCharacter(term:string,page: number):Observable<Character[]>{
    //     const apiArray =this.http.get<Character[]>(`https://api.disneyapi.dev/characters?page=${page}`).pipe(
    //         tap((res) => console.table(res)),
    //         catchError((err) => {
    //             console.log(err);
    //             return of()
    //         })
    //     )
    //     return  apiArray
    // }

    async getFavorisList(): Promise<Favoris[]> {
            const resDb:Observable<Favoris[]> = this.http.get(urlFavorisPost)
            .pipe(tap((res: any) => console.table(res)))
            this.favorisList = (await lastValueFrom(resDb))
        return this.favorisList
    }
    postFavori(favori: Favoris): Observable<Favoris> {
        return this.http.post(urlFavorisPost, favori)
            .pipe(tap((res: any) => console.table(res))
            )
    }
    getOneFavori(id:number): Observable<Favoris>{
        return this.http.get(`${urlFavorisPost}/${id})`)
            .pipe(tap((res: any) => console.table(res))
            )

    }
}