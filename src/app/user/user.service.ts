import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  host:string=" http://localhost:3000/users"

  constructor(private http: HttpClient) { }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.host).pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(this.handleError)
      
    )
  }
  createUser(user: User):Observable<User>{
    let newUser = { ...user , id:null};
    return this.http.post<User>(this.host, newUser).pipe(
      tap(data => console.log("create user "+JSON.stringify(data)),
      catchError(this.handleError)
      )
    )
  }
  daleteUser(id: number):Observable<{}>{
    return this.http.delete(`${this.host}/${id}`).pipe(
      tap( data=> console.log("user with "+id + "delted succesfuly"),
      catchError(this.handleError))
    )
  }
  
  
  
  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
