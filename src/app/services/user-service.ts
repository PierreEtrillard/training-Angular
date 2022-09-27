
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { User } from "../model/user-model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, lastValueFrom, Observable, of, tap } from "rxjs";
import { environment } from "../../environments/environment";
const urlUserPost = environment.urlUserPost

@Injectable({
    providedIn: 'root'
})
export class UserService {
    user: User
    constructor(private http: HttpClient) { }

    
    newUser(userData:User):Observable<User> {
        const httpOptions = {
            headers:new HttpHeaders({'Content-Type':'application/json','Content-Length':JSON.stringify(userData).length.toString()})
        }
        console.log(`J'envois Content-Length':${JSON.stringify(userData).length.toString()}`);
        
       return this.http.post<User>(urlUserPost,JSON.stringify(userData),httpOptions).pipe(
        tap((res) => console.table(res)),
        catchError((err) => {
            console.log(err);
            return of()
        }))

}}