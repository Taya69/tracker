import { Injectable } from '@angular/core';
//import { Users } from '../mock-users';
import { Observable, of, from} from 'rxjs';
import { catchError, find, map, tap } from 'rxjs/operators';
import { User} from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor( private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {     
      console.error(error); 
      return of(result as T);
    };
  }
  login (email: string, password: string): Observable<User> {
    const user = {email, password}
    return this.http.post<User>('api/auth/login', user).pipe(
      catchError(this.handleError<User>('login'))
    )
  } 
  register (email: string, password: string) : Observable<User> {
    const user = {email, password}
    return this.http.post<User>('api/auth/register', user).pipe(      
      catchError(this.handleError<User>('register'))
    )
  }
}
