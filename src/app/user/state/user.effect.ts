import { Injectable } from "@angular/core";
import { UserService } from "../user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UserAction from './user.action'
import { catchError, concatMap, map, mergeMap, of } from "rxjs";

@Injectable()
export class UserEffect{
constructor(private action$: Actions, private userService: UserService){}
loaduser$ = createEffect(()=>{
    return this.action$.pipe(
        ofType(UserAction.loadUsers),
        mergeMap(()=> this.userService.getUsers().pipe(
            map(users=>UserAction.loadUsersSucces({users})),
            catchError(error=> of(UserAction.loadUsersFailure({error})))
        ))
    )
})
SaveUser=createEffect(()=>{
    return this.action$.pipe(
        ofType(UserAction.saveUser),
        concatMap( action => 
            this.userService.createUser(action.user).pipe(
                map(user=>UserAction.saveUserSucces({user})),
                catchError(error => of(UserAction.loadUsersFailure({error})))
                
            )
        )
    )
})
}