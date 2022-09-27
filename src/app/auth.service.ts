import { Injectable } from '@angular/core';
import { delay, Observable, of ,tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  isLoggedIn:boolean = false;
  redirectUrl:string;

  login(name:string, password:string):Observable<boolean>
{
  const isLoggedIn = (name == "Mickey" && password=='123');
  return of(isLoggedIn).pipe(
    delay(1000),
  tap(isLoggedIn=>this.isLoggedIn = isLoggedIn))}
    
logOut(){
  this.isLoggedIn = false
}
}